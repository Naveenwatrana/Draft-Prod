import type { StorybookConfig } from '@storybook/nextjs';
const testRule = (rule: any) => {
  if (rule?.test && typeof rule.test === 'object') {
    return rule.test.test('.svg');
  }
  return false;
};
const config: StorybookConfig = {
  stories: ['../components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  staticDirs: ['../public'],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  docs: {
    autodocs: true
  },
  webpackFinal: async (config) => {
     (config?.module?.rules || [])
     .filter(rule => testRule(rule))
     .forEach((rule: any) => rule.exclude = /\.svg$/i);

    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...(config?.module?.rules || []),
          {
            test: /\.svg$/,
            use: [
              {
                loader: '@svgr/webpack'
              },
            ],
          },
        ],
      },
    };
  },
};
export default config;
