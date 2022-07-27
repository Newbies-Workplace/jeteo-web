import React from "react";
import {StudioSection} from "../../../ui/StudioSection/StudioSection";
import PrimaryButton from "../../../ui/PrimaryButton/PrimaryButton";
import {EventData} from "../../../../api/graphql/events/EventDataQuery";

interface EventLecturesFormProps {
    event: EventData,
    onSubmitted: (event: EventData) => void
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