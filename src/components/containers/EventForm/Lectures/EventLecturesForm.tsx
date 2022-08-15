import React from "react";
import {StudioSection} from "../../../ui/StudioSection/StudioSection";
import PrimaryButton from "../../../ui/PrimaryButton/PrimaryButton";
import {Event} from "../../../../common/models/Event";

interface EventLecturesFormProps {
    event: Event,
    onSubmitted: (event: Event) => void
}

export const EventLecturesForm: React.FC<EventLecturesFormProps> = ({event, onSubmitted}) => {
    return (
        <div>
            <StudioSection title={"lectures"}>
                <PrimaryButton onClick={() => onSubmitted(event)}>
                    test {event.id}
                </PrimaryButton>
            </StudioSection>
        </div>
    )
}