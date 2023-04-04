import React from "react";
import {StudioSection} from "../../../../components/molecules/StudioSection/StudioSection";
import formStyles from "../../Form.module.scss";
import Button from "../../../../components/atoms/Button/Button";
import dayjs from "dayjs";
import {
    CoreLectureResponseFragment, InviteLectureResponseFragment,
    LectureRequestInput,
    useCreateLectureMutation,
    useReplaceLectureMutation
} from "../../../../api/graphql";
import {useAuth} from "../../../../contexts/auth/hooks/useAuth.hook";
import {toast} from "react-toastify";
import {Controller, useForm} from "react-hook-form";
import {Input} from "../../../../components/atoms/Input/Input";

interface LectureBasicInfoFormProps {
    eventId: string
    lecture?: CoreLectureResponseFragment
    onSubmitted: (lecture: CoreLectureResponseFragment) => void
}

export const LectureBasicInfoForm: React.FC<LectureBasicInfoFormProps> = ({eventId, lecture, onSubmitted}) => {
    const [createLecture] = useCreateLectureMutation()
    const [replaceLecture] = useReplaceLectureMutation()
    const {user} = useAuth()

    const initialValues: LectureBasicFormValues = lecture ? {
        startDate: dayjs(lecture.timeFrame.startDate).format("YYYY-MM-DDTHH:mm"),
        finishDate:dayjs(lecture.timeFrame.finishDate).format("YYYY-MM-DDTHH:mm"),
        title: lecture.title,
        description: lecture.description,
    } : {
        startDate: dayjs().format("YYYY-MM-DDTHH:mm"),
        finishDate: dayjs().add(1, 'hour').format("YYYY-MM-DDTHH:mm"),
        title: '',
        description: undefined,
    }
    const {register, control, handleSubmit} = useForm<LectureBasicFormValues>({defaultValues: initialValues});

    const submitFunction = (request: LectureRequestInput): Promise<CoreLectureResponseFragment> => {
        if (lecture) {
            return replaceLecture({
                variables: {
                    id: lecture.id,
                    request: request,
                }
            })
                .then((res) => res.data ?? Promise.reject("no data"))
                .then((data) => data.replaceLecture)
        } else {
            return createLecture({
                variables: {
                    eventId: eventId,
                    request: request,
                }
            })
                .then((res) => res.data ?? Promise.reject("no data"))
                .then((data) => data.createLecture)
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
            .then((submittedLecture: CoreLectureResponseFragment) => {
                onSubmitted(submittedLecture)

                toast.success(lecture ? "Prelekcja zaktualizowana" : "Prelekcja dodana")
            })
            .catch(() => toast.error("Wystąpił błąd"))
    }

    return (
        <form onSubmit={handleSubmit(onSubmitClicked)}>
            <StudioSection title={"Co i kiedy?"}>
                <div className={formStyles.row}>
                    <div className={formStyles.date}>
                        <b>Rozpoczęcie *</b>
                        <input
                            type={"datetime-local"}
                            {...register('startDate')}
                            className={formStyles.input}/>
                    </div>
                    <div className={formStyles.date}>
                        <b>Zakończenie *</b>
                        <input
                            type={"datetime-local"}
                            {...register('finishDate')}
                            className={formStyles.input}/>
                    </div>
                </div>

                <Controller
                    name={'title'}
                    control={control}
                    render={({field}) =>
                        <Input
                            required
                            label={'Tytuł'}
                            value={field.value}
                            setValue={field.onChange} />
                    } />

                <Controller
                    name={'description'}
                    control={control}
                    render={({field}) =>
                        <Input
                            multiline
                            label={'Opis'}
                            value={field.value ?? ''}
                            setValue={field.onChange} />
                    } />
            </StudioSection>

            <div className={formStyles.submit}>
                <Button primary type={"submit"}>
                    Zapisz
                </Button>
            </div>
        </form>
    )
}

interface LectureBasicFormValues {
    startDate: string
    finishDate: string
    title: string
    description?: string
}