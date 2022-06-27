import React from "react";
import {StudioSection} from "../../../../components/ui/StudioSection/StudioSection";
import PrimaryButton from "../../../../components/ui/PrimaryButton/PrimaryButton";

interface EventLecturesFormProps {
    eventId: string,
    onSubmitted: () => void
}

export const EventLecturesForm: React.FC<EventLecturesFormProps> = ({eventId, onSubmitted}) => {
    return (
        <div>
            <StudioSection title={"lectures"}>
                <PrimaryButton onClick={() => onSubmitted()}>
                    test {eventId}
                </PrimaryButton>
            </StudioSection>
        </div>
    )
}