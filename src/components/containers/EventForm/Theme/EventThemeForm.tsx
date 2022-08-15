import React from "react";
import {StudioSection} from "../../../ui/StudioSection/StudioSection";
import PrimaryButton from "../../../ui/PrimaryButton/PrimaryButton";
import formStyles from "../EventForm.module.scss";
import {EventCard} from "../../EventCard/EventCard";
import {Event} from "../../../../common/models/Event";
import FileUpload from "../../../ui/FileUpload/FileUpload";

interface EventThemeFormProps {
    event: Event,
    onSubmitted: (event: Event) => void
}

export const EventThemeForm: React.FC<EventThemeFormProps> = ({event, onSubmitted}) => {
    return (
        <div>
            <StudioSection title={"Motyw"}>
                fota
                <FileUpload onChange={(files) => {}}/>
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