import React from 'react';
import {SectionContainer} from "../SectionContainer/SectionContainer";
import MDEditor from '@uiw/react-md-editor';

interface EventDescriptionSectionProps {
    description: string
}

export const EventDescriptionSection: React.FC<EventDescriptionSectionProps> = ({description}) => {

    return (
        <SectionContainer label="Opis">
            <div data-color-mode="light">
                <MDEditor.Markdown source={description}/>
            </div>
        </SectionContainer>
    )
}
