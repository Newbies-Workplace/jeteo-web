import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import {ClickableStepView} from './StepView';

export default {
    title: 'ClickableStepView',
    component: ClickableStepView,
} as ComponentMeta<typeof ClickableStepView>;

export const Normal: ComponentStory<typeof ClickableStepView> =
    () => <ClickableStepView
        steps={["Wygląd", "Prelekcje", "Publikacja"]}
        activeStepIndex={1}
        onStepClicked={() => {}}
    />;
