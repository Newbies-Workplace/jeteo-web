import React from "react";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
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
}