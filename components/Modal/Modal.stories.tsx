import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ModalElement } from 'components/Modal/Modal';
import StoryWrapper from 'components/wrapper/wrapper';

export default {
  title: 'DesignSystem/Modal',
  component: ModalElement,
} as ComponentMeta<typeof ModalElement>;

const Template: ComponentStory<typeof ModalElement> = (args) => <StoryWrapper><ModalElement {...args} /></StoryWrapper>;
export const Modal = Template.bind({});
Modal.args = {
};
