import React from "react";
import {StudioSection} from "../../../ui/StudioSection/StudioSection";
import formStyles from "../../Form.module.scss";
import Button from "../../../ui/Button/Button";
import dayjs from "dayjs";
import {
    CoreLectureResponseFragment,
    LectureRequestInput, useCreateLectureInviteMutation,
    useCreateLectureMutation, useDeleteLectureInviteMutation,
    useReplaceLectureMutation
} from "../../../../api/graphql";
import {useAuth} from "../../../../contexts/auth/hooks/useAuth.hook";
import {toast} from "react-toastify";
import {Controller, useForm} from "react-hook-form";
import {Input} from "../../../ui/Input/Input";
import {LectureSpeakers} from "../../../ui/LectureSpeakers/LectureSpeakers";

interface LectureBasicInfoFormProps {
    eventId: string
    lecture?: CoreLectureResponseFragment
    onSubmitted: (lecture: CoreLectureResponseFragment) => void
}

export const LectureBasicInfoForm: React.FC<LectureBasicInfoFormProps> = ({eventId, lecture, onSubmitted}) => {
    const [createLecture] = useCreateLectureMutation()
    const [replaceLecture] = useReplaceLectureMutation()
    const [deleteInvite] = useDeleteLectureInviteMutation()
    const [createInvite] = useCreateLectureInviteMutation()
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

    const onDeleteSpeaker = (speakerId: string) => {
        // todo
    }

    const onDeleteInvite = (inviteId: string) => {
        deleteInvite({
            variables: {
                inviteId: inviteId,
            }
        })
            .then(() => {toast.success('Zaproszenie usunięto')})
            .catch(() => {toast.error('Błąd podczas usuwania zaproszenia')})
    }

    const onCreateInvite = (name: string) => {
        createInvite({
            variables: {
                lectureId: lecture?.id!,
                request: {
                    name: name
                }
            }
        })
            .then(() => {toast.success('Zaproszenie stworzono')})
            .catch(() => {toast.error('Błąd podczas dodawania zaproszenia')})
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

            <StudioSection title={"Prelegenci (max 2 osoby)"}>
                {/*todo fix no id*/}
                {lecture?.id &&
                    <LectureSpeakers
                        lectureId={lecture?.id}
                        speakers={lecture?.speakers?.map((value) => ({
                            id: value.id,
                            name: value.nickname,
                            avatar: value.avatar,
                        })) ?? []}
                        invites={lecture?.invites?.map((value) => ({
                            id: value.id,
                            name: value.name,
                        })) ?? []}
                        onCreateInvite={onCreateInvite}
                        onDeleteInvite={onDeleteInvite}
                        onDeleteSpeaker={onDeleteSpeaker}
                    />
                }
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