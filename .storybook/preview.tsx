import React from "react";
import { MemoryRouter } from "react-router-dom";
import type { Preview } from "@storybook/react";
import './../src/index.css';

const preview: Preview = {
  parameters: {
    actions: {argTypesRegex: "^on[A-Z].*"},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'silver',
      values: [
        {
          name: 'silver',
          value: '#C0C0C0',
        },
        {
          name: 'white',
          value: '#ffffff',
        },
      ],
    },
    decorators: [
      (Story: any) => <MemoryRouter><Story/></MemoryRouter>
    ]
  },
}

export default preview;
