import React from "react";
import {
    CoreLectureResponseFragment, InviteLectureResponseFragment,
    useCreateLectureInviteMutation,
    useDeleteLectureInviteMutation, useReplaceLectureMutation
} from "../../../../api/graphql";
import {StudioSection} from "../../../../components/ui/StudioSection/StudioSection";
import {LectureSpeakers} from "../../../../components/ui/LectureSpeakers/LectureSpeakers";
import formStyles from "../../Form.module.scss";
import Button from "../../../../components/ui/Button/Button";
import {toast} from "react-toastify";
import dayjs from "dayjs";

interface LectureSpeakersFormProps {
    lecture: CoreLectureResponseFragment & InviteLectureResponseFragment
    onLectureChange: (lecture: CoreLectureResponseFragment & InviteLectureResponseFragment) => void
    onSubmitted: (lecture: CoreLectureResponseFragment & InviteLectureResponseFragment) => void
}

export const LectureSpeakersForm: React.FC<LectureSpeakersFormProps> = ({lecture, onLectureChange, onSubmitted}) => {
    const [deleteInvite] = useDeleteLectureInviteMutation()
    const [createInvite] = useCreateLectureInviteMutation()
    const [replaceLecture] = useReplaceLectureMutation()

    const onDeleteSpeaker = (speakerId: string) => {
        replaceLecture({
            variables: {
                id: lecture.id,
                request: {
                    speakerIds: lecture.speakers.filter(speaker => speaker.id !== speakerId).map(speaker => speaker.id),
                    title: lecture.title,
                    description: lecture.description,
                    timeFrame: {
                        startDate: dayjs(lecture.timeFrame.startDate).toISOString(),
                        finishDate: dayjs(lecture.timeFrame.finishDate).toISOString(),
                    },
                }
            }
        })
            .then((res) => {
                onLectureChange({...lecture, speakers: lecture.speakers.filter((speaker) => speaker.id !== speakerId)})
            })
            .then(() => {toast.success('Prelegenta usunięto')})
            .catch(() => {toast.error('Błąd podczas usuwania prelegenta')})
    }

    const onDeleteInvite = (inviteId: string) => {
        deleteInvite({
            variables: {
                inviteId: inviteId,
            }
        })
            .then(() => {
                onLectureChange({...lecture, invites: lecture.invites.filter((invite) => invite.id !== inviteId)})
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
            .then((res) => {
                const invite = res.data?.createLectureInvite
                if (!invite) {
                    return Promise.reject('failed to get invite')
                }

                onLectureChange({...lecture, invites: [...lecture.invites, invite]})
            })
            .then(() => {toast.success('Zaproszenie stworzono')})
            .catch(() => {toast.error('Błąd podczas dodawania zaproszenia')})
    }

    return (
        <div>
            <StudioSection title={"Prelegenci (max 2 osoby)"}>
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
            </StudioSection>

            <div className={formStyles.submit}>
                <Button onClick={() => onSubmitted(lecture)}>
                    Gotowe
                </Button>
            </div>
        </div>
    )
}