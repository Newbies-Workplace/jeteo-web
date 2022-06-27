import React from "react";
import {StudioSection} from "../../../../components/ui/StudioSection/StudioSection";
import PrimaryButton from "../../../../components/ui/PrimaryButton/PrimaryButton";

interface EventThemeFormProps {
    eventId: string,
    onSubmitted: () => void
}

export const EventThemeForm: React.FC<EventThemeFormProps> = ({eventId, onSubmitted}) => {
    return (
        <div>
            <StudioSection title={"theme"}>
                <PrimaryButton onClick={() => onSubmitted()}>
                    test {eventId}
                </PrimaryButton>
            </StudioSection>
        </div>
    )
}