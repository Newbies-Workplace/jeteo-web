import React from "react";
import {StudioSection} from "../../../../components/molecules/StudioSection/StudioSection";
import Button from "../../../../components/atoms/Button/Button";
import FileUpload from "../../../../components/atoms/FileUpload/FileUpload";
import FileItem from "../../../../components/atoms/FileItem/FileItem";
import {EventCard} from "../../../../components/molecules/EventCard/EventCard";
import {Event} from "../../../../common/models/Event";
import formStyles from "../../Form.module.scss";
import {deleteImage, updateImage} from "../../../../api/rest/event/Event";
import {useAuth} from "../../../../contexts/auth/hooks/useAuth.hook";
import {EventThemeRequestInput, useReplaceEventThemeMutation} from "../../../../api/graphql";
import {HexColorPicker, HexColorInput} from "react-colorful";
import {toast} from "react-toastify";
import {useForm, Controller} from "react-hook-form";

interface EventThemeFormProps {
    event: Event,
    onEventChange: (event: Event) => void
    onSubmitted: (event: Event) => void
}

export const EventThemeForm: React.FC<EventThemeFormProps> = ({event, onEventChange, onSubmitted}) => {
    const [replaceEventTheme] = useReplaceEventThemeMutation()

    const {axios} = useAuth()

    const initialValues: EventThemeFormValues = {
        primaryColor: event.primaryColor ?? "#123123",
    }
    const { handleSubmit, control, watch} = useForm<EventThemeFormValues>({defaultValues: initialValues});
    const watchPrimaryColor = watch('primaryColor')

    const onCoverDeleteClick = async () => {
        deleteImage(axios, event.id)
            .then(() => {
                const updatedEvent: Event = {...event, image: undefined}
                onSubmitted(updatedEvent)
            })
            .catch(() => toast.error("Wystąpił błąd podczas usuwania okładki"))
    }

    const onCoverFileUpdate = async (file: File) => {
        updateImage(axios, event.id, file)
            .then((res) => {
                onEventChange({...event, image: " "})
                onEventChange({...event, image: res.url})
            })
            .catch(() => toast.error("Wystąpił błąd podczas przesyłania okładki"))
    }

    const onSubmitClick = (values: EventThemeFormValues) => {
        const request: EventThemeRequestInput = {
            primaryColor: values.primaryColor,
        }

        replaceEventTheme({
            variables: {
                id: event.id,
                request: request
            }
        })
            .then((res) => res.data ?? Promise.reject("no data"))
            .then((data) => data.replaceEventTheme)
            .then(Event.fromData)
            .then((event: Event) => {
                onSubmitted(event)

                toast.success("Motyw zaktualizowano")
            })
            .catch((e) => {
                console.error(e)
                toast.error("Wystąpił błąd")
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmitClick)}>
            <StudioSection title={"Motyw"}>
                <div className={formStyles.row}>
                    <div>
                        <h4>Kolor przewodni:</h4>
                        <Controller
                            name={"primaryColor"}
                            control={control}
                            render={({field}) =>
                                <div>
                                    <HexColorPicker
                                        color={field.value ?? undefined}
                                        onChange={(color) => field.onChange(color)}/>
                                    <HexColorInput
                                        className={formStyles.input}
                                        prefixed
                                        color={field.value ?? undefined}
                                        onChange={(color) => field.onChange(color)}/>
                                </div>
                            }/>
                    </div>

                    <div>
                        <h4>Okładka:</h4>
                        <div className={formStyles.row}>
                            {event.image &&
                                <FileItem
                                    url={event.image}
                                    onDeleteClick={onCoverDeleteClick}/>
                            }
                            {!event.image &&
                                <FileUpload
                                    onChange={(files) => onCoverFileUpdate(files[0])}/>
                            }
                        </div>
                    </div>
                </div>
            </StudioSection>

            <StudioSection title={"Podgląd"}>
                <EventCard
                    title={event.title}
                    subtitle={event.subtitle}
                    color={watchPrimaryColor}
                    image={event.image}
                    locationName={event.location?.place}
                    startDate={event.startDate}/>
            </StudioSection>

            <StudioSection title={"Galeria"}>
                <h4>W przyszłości...</h4>
            </StudioSection>

            <div className={formStyles.submit}>
                <Button primary type={"submit"}>
                    Zapisz
                </Button>
            </div>
        </form>
    )
}

interface EventThemeFormValues {
    primaryColor?: string
}