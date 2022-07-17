import React from "react";
import {StudioSection} from "../../../ui/StudioSection/StudioSection";
import PrimaryButton from "../../../ui/PrimaryButton/PrimaryButton";
import {EventData} from "../../../../api/graphql/events/EventDataQuery";

interface EventThemeFormProps {
    event: EventData,
    onSubmitted: (event: EventData) => void
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