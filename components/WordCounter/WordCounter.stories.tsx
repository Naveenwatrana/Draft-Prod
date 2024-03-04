import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { WordCounter } from 'components/WordCounter/WordCounter';
import StoryWrapper from 'components/wrapper/wrapper';

export default {
  title: 'DesignSystem/WordCounter',
  component: WordCounter,
} as ComponentMeta<typeof WordCounter>;

const Template: ComponentStory<typeof WordCounter> = (args) => <StoryWrapper><WordCounter {...args} /></StoryWrapper>;
export const Counter = Template.bind({});
Counter.args = {
  count: 0,
  total: 200,
};
