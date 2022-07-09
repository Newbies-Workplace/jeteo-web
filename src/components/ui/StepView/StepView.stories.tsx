import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StepView } from './StepView';

export default {
    title: 'StepView',
    component: StepView,
} as ComponentMeta<typeof StepView>;

export const Normal: ComponentStory<typeof StepView> =
    () => <StepView
        steps={["Wygląd", "Prelekcje", "Publikacja"]}
        activeStepIndex={1}
    />;
