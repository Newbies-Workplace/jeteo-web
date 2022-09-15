import React from "react";
import {Field, Form, Formik} from "formik";
import {StudioSection} from "../../../ui/StudioSection/StudioSection";
import {FieldProps} from "formik/dist/Field";
import MDEditor from "@uiw/react-md-editor";
import formStyles from "../../Form.module.scss";
import Button from "../../../ui/Button/Button";
import dayjs from "dayjs";
import {LectureRequestInput, useCreateLectureMutation, useReplaceLectureMutation} from "../../../../api/graphql";
import {Lecture} from "../../../../common/models/Lecture";
import {useAuth} from "../../../../contexts/auth/hooks/useAuth.hook";

interface LectureBasicInfoFormProps {
    eventId: string
    lecture?: Lecture
    onSubmitted: (lecture: Lecture) => void
}

export const LectureBasicInfoForm: React.FC<LectureBasicInfoFormProps> = ({eventId, lecture, onSubmitted}) => {
    const [createLecture] = useCreateLectureMutation()
    const [replaceLecture] = useReplaceLectureMutation()
    const {user} = useAuth()

    const initialValues: LectureBasicFormValues = lecture ? {
        startDate: dayjs(lecture.startDate).format("YYYY-MM-DDTHH:mm"),
        finishDate: lecture?.finishDate ? dayjs(lecture.finishDate).format("YYYY-MM-DDTHH:mm") : undefined,
        title: lecture.title,
        description: lecture.description,
    } : {
        startDate: dayjs().format("YYYY-MM-DDTHH:mm"),
        finishDate: dayjs().add(1, 'hour').format("YYYY-MM-DDTHH:mm"),
        title: '',
        description: undefined,
    }

    const submitFunction = (request: LectureRequestInput): Promise<Lecture> => {
        if (lecture) {
            return replaceLecture({
                variables: {
                    id: lecture.id,
                    request: request,
                }
            })
                .then((res) => res.data ?? Promise.reject("no data"))
                .then((data) => data.replaceLecture)
                .then(Lecture.fromData)
        } else {
            return createLecture({
                variables: {
                    eventId: eventId,
                    request: request,
                }
            })
                .then((res) => res.data ?? Promise.reject("no data"))
                .then((data) => data.createLecture)
                .then(Lecture.fromData)

        }
    }

    const onSubmitClicked = (values: LectureBasicFormValues) => {
        const request = {
            title: values.title,
            description: values.description,
            timeFrame: {
                startDate: dayjs(values.startDate).toISOString(),
                finishDate: dayjs(values.finishDate).toISOString(),
            },
            speakerIds: [user?.id!]
        }

        submitFunction(request)
            .then((lecture: Lecture) => {
                onSubmitted(lecture)
            })
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmitClicked}>
            <Form>
                <StudioSection title={"Co i kiedy?"}>
                    <div className={formStyles.row}>
                        od
                        <Field type={"datetime-local"} id={"startDate"} name={"startDate"} />
                        do (opcjonalne)
                        <Field type={"datetime-local"} id={"finishDate"} name={"finishDate"} />
                    </div>

                    <Field id={"title"} name={"title"} placeholder={"Tytuł"}/>
                    <h4>Opis</h4>
                    <Field
                        id={"description"}
                        name={"description"}
                        component={({field, form: {setFieldValue}}: FieldProps) =>
                            <div data-color-mode="light">
                                <MDEditor
                                    textareaProps={{maxLength: 10000}}
                                    height={200}
                                    value={field.value}
                                    onChange={(value) => setFieldValue(field.name, value)} />
                            </div>
                        } />
                </StudioSection>

                <StudioSection title={"Kto?"}>

                </StudioSection>

                <div className={formStyles.submit}>
                    <Button type={"submit"}>
                        Zapisz
                    </Button>
                </div>
            </Form>
        </Formik>
    )
}

interface LectureBasicFormValues {
    startDate: string
    finishDate?: string
    title: string
    description?: string
}