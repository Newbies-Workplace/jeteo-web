import React from "react";
import {StudioSection} from "../../../ui/StudioSection/StudioSection";
import PrimaryButton from "../../../ui/PrimaryButton/PrimaryButton";
import {Event} from "../../../../common/models/Event";

interface EventThemeFormProps {
    event: Event,
    onSubmitted: (event: Event) => void
}

export const EventThemeForm: React.FC<EventThemeFormProps> = ({event, onSubmitted}) => {
    return (
        <div>
            <StudioSection title={"theme"}>
                <PrimaryButton onClick={() => onSubmitted(event)}>
                    test {event.id}
                </PrimaryButton>
            </StudioSection>
        </div>
    )
}