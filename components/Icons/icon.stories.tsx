import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { LogoIcon } from 'components/Icons/icon';
import { CheckIcon } from 'components/Icons/CheckIcon';

export default {
  title: 'DesignSystem/Icon',
  component: LogoIcon,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof LogoIcon>;

const LogoComponent: ComponentStory<typeof LogoIcon> = (args) => <LogoIcon {...args} />;
export const Logo = LogoComponent.bind({});
Logo.args = {};

export const LogoDark = LogoComponent.bind({});
LogoDark.args = {
  theme: 'dark',
};

const CheckIconComponent: ComponentStory<typeof CheckIcon> = (args) => <CheckIcon {...args} />;
export const Check = CheckIconComponent.bind({});
Check.args = {
  color: '#5FF088',
  size: 20,
};
