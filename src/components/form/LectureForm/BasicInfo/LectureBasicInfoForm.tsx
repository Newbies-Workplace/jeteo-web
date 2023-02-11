import React from "react";
import {Field, Form, Formik} from "formik";
import {StudioSection} from "../../../ui/StudioSection/StudioSection";
import {FieldProps} from "formik/dist/Field";
import formStyles from "../../Form.module.scss";
import Button from "../../../ui/Button/Button";
import dayjs from "dayjs";
import {LectureRequestInput, useCreateLectureMutation, useReplaceLectureMutation} from "../../../../api/graphql";
import {Lecture} from "../../../../common/models/Lecture";
import {useAuth} from "../../../../contexts/auth/hooks/useAuth.hook";
import {toast} from "react-toastify";
import cs from "classnames"

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
            .then((submittedLecture: Lecture) => {
                onSubmitted(submittedLecture)

                toast.success(lecture ? "Prelekcja zaktualizowana" : "Prelekcja dodana")
            })
            .catch(() => toast.error("Wystąpił błąd"))
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmitClicked}>
            <Form>
                <StudioSection title={"Co i kiedy?"}>
                    <div className={formStyles.row}>
                        <div className={formStyles.date}>
                            <b>* Rozpoczęcie</b>
                            <Field
                                type={"datetime-local"}
                                id={"startDate"}
                                name={"startDate"}
                                className={formStyles.input}/>
                        </div>
                        <div className={formStyles.date}>
                            <b>Zakończenie</b>
                            <Field
                                type={"datetime-local"}
                                id={"finishDate"}
                                name={"finishDate"}
                                className={formStyles.input}/>
                        </div>
                    </div>

                    <Field
                        id={"title"}
                        name={"title"}
                        placeholder={"Tytuł"}
                        className={formStyles.input}/>
                    <h4>Opis</h4>
                    <Field
                        id={"description"}
                        name={"description"}
                        component={({field}: FieldProps) =>
                            <textarea {...field} className={cs(formStyles.input, formStyles.textareaInput)}/>
                        } />
                </StudioSection>

                <StudioSection title={"Kto?"}>
                    W przyszłości
                </StudioSection>

                <div className={formStyles.submit}>
                    <Button primary type={"submit"}>
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