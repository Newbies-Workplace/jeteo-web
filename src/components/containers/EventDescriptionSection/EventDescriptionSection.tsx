import React from 'react';
import {SectionContainer} from "../SectionContainer/SectionContainer";
import parseMD from "parse-md";

interface EventDescriptionSectionProps {
    description: string
}

export const EventDescriptionSection: React.FC<EventDescriptionSectionProps> = ({description}) => {

    //todo(DiD3n): check perf
    const parsedDescription = parseMD(description);

    return (
        <SectionContainer label="Opis">
            {parsedDescription}
        </SectionContainer>
    )
}
