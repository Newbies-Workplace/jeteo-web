import React from "react";
import {StudioSection} from "../../../ui/StudioSection/StudioSection";
import Button from "../../../ui/Button/Button";
import FileUpload from "../../../ui/FileUpload/FileUpload";
import FileItem from "../../../ui/FileItem/FileItem";
import {EventCard} from "../../../containers/EventCard/EventCard";
import {Event} from "../../../../common/models/Event";
import formStyles from "../../Form.module.scss";
import {deleteImage, updateImage} from "../../../../api/rest/event/Event";
import {useAuth} from "../../../../contexts/auth/hooks/useAuth.hook";
import {useReplaceEventThemeMutation} from "../../../../api/graphql";
import {Field, Form, Formik} from "formik";
import {HexColorPicker, HexColorInput} from "react-colorful";
import {FieldProps} from "formik/dist/Field";
import {toast} from "react-toastify";

interface EventThemeFormProps {
    event: Event,
    onEventChange: (event: Event) => void
    onSubmitted: (event: Event) => void
}

export const EventThemeForm: React.FC<EventThemeFormProps> = ({event, onEventChange, onSubmitted}) => {
    const [replaceEventTheme] = useReplaceEventThemeMutation()
    const {axios} = useAuth()

    const initialValues: EventThemeFormValues = {
        primaryColor: event.primaryColor,
        secondaryColor: undefined,
    }

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
                const updatedEvent: Event = {...event, image: res.url}
                onEventChange(updatedEvent)
            })
            .catch(() => toast.error("Wystąpił błąd podczas przesyłania okładki"))
    }

    const onSubmitClick = (values: EventThemeFormValues) => {
        const request = {
            primaryColor: values.primaryColor,
            secondaryColor: values.primaryColor,
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
            .catch(() => toast.error("Wystąpił błąd"))
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmitClick}>
            <Form>
                <StudioSection title={"Motyw"}>
                    <div className={formStyles.row}>
                        <div>
                            <h4>Kolor przewodni:</h4>
                            <Field
                                id={"primaryColor"}
                                name={"primaryColor"}
                                placeholder={"Kolor przewodni"}
                                component={({field, form: {setFieldValue}}: FieldProps) =>
                                    <div>
                                        <HexColorPicker
                                            color={field.value ?? undefined}
                                            onChange={(color) => setFieldValue(field.name, color) }/>
                                        <HexColorInput
                                            className={formStyles.input}
                                            prefixed
                                            color={field.value ?? undefined}
                                            onChange={(color) => setFieldValue(field.name, color)} />
                                    </div>
                                } />
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
                        color={event.primaryColor}
                        image={event.image}
                        locationName={event.location?.city}
                        startDate={event.startDate} />
                </StudioSection>

                <StudioSection title={"Galeria"}>
                    <h4>W przyszłości...</h4>
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

interface EventThemeFormValues {
    primaryColor?: string
    secondaryColor?: string
}