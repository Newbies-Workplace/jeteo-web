import React from "react";
import {StudioSection} from "../../../ui/StudioSection/StudioSection";
import PrimaryButton from "../../../ui/PrimaryButton/PrimaryButton";
import FileUpload from "../../../ui/FileUpload/FileUpload";
import FileItem from "../../../ui/FileItem/FileItem";
import {EventCard} from "../../EventCard/EventCard";
import {Event} from "../../../../common/models/Event";
import formStyles from "../EventForm.module.scss";
import styles from "./EventThemeForm.module.scss";
import {deleteImage, updateImage} from "../../../../api/rest/event/Event";
import {useAuth} from "../../../../contexts/auth/hooks/useAuth.hook";
import {useReplaceEventThemeMutation} from "../../../../api/graphql";
import {Field, Form, Formik} from "formik";
import {HexColorPicker, HexColorInput} from "react-colorful";
import {FieldProps} from "formik/dist/Field";

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
    }

    const onCoverFileUpdate = async (file: File) => {
        updateImage(axios, event.id, file)
            .then((res) => {
                const updatedEvent: Event = {...event, image: res.url}
                onEventChange(updatedEvent)
            })
    }

    const onSubmitClick = (values: EventThemeFormValues) => {
        const request = {
            primaryColor: values.primaryColor,
            secondaryColor: undefined,
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
            })
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmitClick}>
            <Form>
                <StudioSection title={"Motyw"}>
                    <h4>Kolor przewodni:</h4>
                    <Field
                        id={"primaryColor"}
                        name={"primaryColor"}
                        placeholder={"Kolor przewodni"}
                        component={({field, form: {setFieldValue}}: FieldProps) =>
                            <div>
                                <HexColorPicker
                                    color={field.value}
                                    onChange={(color) => setFieldValue(field.name, color) }/>
                                <HexColorInput
                                    prefixed
                                    color={field.value}
                                    onChange={(color) => setFieldValue(field.name, color)} />
                            </div>
                        } />

                    <h4>Okładka:</h4>
                    <div className={styles.row}>
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

                </StudioSection>

                <div className={formStyles.submit}>
                    <PrimaryButton type={"submit"}>
                        Zapisz
                    </PrimaryButton>
                </div>
            </Form>
        </Formik>
    )
}

interface EventThemeFormValues {
    primaryColor?: string
    secondaryColor?: string
}