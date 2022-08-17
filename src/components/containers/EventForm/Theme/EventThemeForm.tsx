import React from "react";
import {StudioSection} from "../../../ui/StudioSection/StudioSection";
import PrimaryButton from "../../../ui/PrimaryButton/PrimaryButton";
import formStyles from "../EventForm.module.scss";
import {EventCard} from "../../EventCard/EventCard";
import {Event} from "../../../../common/models/Event";
import FileUpload from "../../../ui/FileUpload/FileUpload";
import FileItem from "../../../ui/FileItem/FileItem";
import styles from "./EventThemeForm.module.scss";

interface EventThemeFormProps {
    event: Event,
    onSubmitted: (event: Event) => void
}

export const EventThemeForm: React.FC<EventThemeFormProps> = ({event, onSubmitted}) => {
    return (
        <div>
            <StudioSection title={"Motyw"}>
                <h4>Kolor przewodni:</h4>
                todo todo

                <h4>Okładka:</h4>
                <div className={styles.row}>
                    {event.image &&
                        <FileItem
                            url={event.image}
                            onDeleteClick={() => {}}/>
                    }
                    {!event.image &&
                        <FileUpload
                            onChange={(files) => {
                            }}/>
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
                    startDate={event.startDate }/>
            </StudioSection>

            <StudioSection title={"Galeria"}>

            </StudioSection>

            <div className={formStyles.submit}>
                <PrimaryButton type={"submit"}>
                    Zapisz
                </PrimaryButton>
            </div>
        </div>
    )
}