import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Container } from 'components/Container/Container';
import StoryWrapper from 'components/wrapper/wrapper';

export default {
  title: 'DesignSystem/Container',
  component: Container,
} as ComponentMeta<typeof Container>;

const Template: ComponentStory<typeof Container> = (args) => <StoryWrapper><Container {...args} /></StoryWrapper>;
export const Bio = Template.bind({});
Bio.args = {
  title: 'Bio',
  heading: 'Add Bio',
  description: 'Add bio to your profile',
  buttonText: 'Add Bio',
  onClick: () => {},
};
