import type { Meta, StoryObj } from '@storybook/react';
import StoryWrapper from 'components/wrapper/wrapper';
import GreenShareIcon from '.';

const meta: Meta<typeof GreenShareIcon> = {
  component: GreenShareIcon,
  title: 'Atoms/Green Share Icon',
};
type Story = StoryObj<typeof GreenShareIcon>;

export const Primary: Story = {
  render: () => <StoryWrapper><GreenShareIcon primary /></StoryWrapper>,
};

export const Secondary: Story = {
  render: () => <StoryWrapper><GreenShareIcon primary={false} /></StoryWrapper>,
};

export default meta;
