import React from 'react';

import { Preview } from '@storybook/react';

import { ThemeProvider } from 'styled-components';
import { theme } from '../common/theme'

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
        </ThemeProvider>
    ),
  ],
};

export default preview;
