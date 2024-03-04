import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import TextComp from 'components/textComp';

export default {
  title: 'DesignSystem/Text',
  component: TextComp,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof TextComp>;

const Template: ComponentStory<typeof TextComp> = (args) => <TextComp {...args} />;

export const Heading1 = Template.bind({});
Heading1.args = {
  children: 'Hello World',
  component: 'h1',
};

export const Heading2 = Template.bind({});
Heading2.args = {
  children: 'Hello World',
  component: 'h2',
};

export const Paragraph = Template.bind({});
Paragraph.args = {
  children: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque lacinia mollis felis,
  eu vehicula neque mollis eu. Pellentesque quis pellentesque eros. Nunc arcu justo, fermentum vitae
  massa et, efficitur malesuada risus. Nunc magna ligula, feugiat egestas lorem ac, suscipit iaculis
  magna. Praesent quis lorem vel nibh lobortis tincidunt at ac odio.`,
};
