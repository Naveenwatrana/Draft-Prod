// Button.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';
import StoryWrapper from 'components/wrapper/wrapper';
import ActionBarLogo from '.';

const meta: Meta<typeof ActionBarLogo> = {
  component: ActionBarLogo,
  title: 'Atoms/Action Bar Logo',
};
type Story = StoryObj<typeof ActionBarLogo>;

export const Primary: Story = {
  render: () => <StoryWrapper><ActionBarLogo /></StoryWrapper>,
};

export default meta;
