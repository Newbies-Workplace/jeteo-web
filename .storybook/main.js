module.exports = {
  "stories": ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  "framework": {
    name: "@storybook/react-vite",
    options: {}
  },
  viteFinal: {
    define: {
      "__RESTAPI_URI__": "''",
      "__GRAPHQL_URI__": "''",
      "__DEV__": false
    }
  },
  docs: {
    autodocs: true
  }
};