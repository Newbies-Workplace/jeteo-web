module.exports = {
  async viteFinal(config, { configType }) {
    return {
      ...config,
      build: {
        ...config.build,
        rollupOptions: {
          ...config.build.rollupOptions,
          output: {
            ...config.build.rollupOptions.output,
            manualChunks: () => 'everything.js',
            entryFileNames: `assets/[name].js`,
            chunkFileNames: `assets/[name].js`,
            assetFileNames: `assets/[name].[ext]`,
          },
        },
      },
      define: {
        "__RESTAPI_URI__": "''",
        "__GRAPHQL_URI__": "''",
        "__DEV__": false,
      },
    };
  },
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react-vite",
  docs: {
    autodocs: true
  },
  features: {
    storyStoreV7: true
  }
};