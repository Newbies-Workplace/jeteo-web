const { svgrComponent } = require('vite-plugin-svgr-component')

module.exports = {
  async viteFinal(config, { configType }) {
    // return the customized config
    return {
      ...config,
      plugins: [...config.plugins, svgrComponent()]
    };
  },
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite"
  },
  features: {
    storyStoreV7: true
  }
}