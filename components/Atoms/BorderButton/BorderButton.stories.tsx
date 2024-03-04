import type { Meta, StoryObj } from '@storybook/react';

import BorderedButton from '.';

const meta: Meta<typeof BorderedButton> = {
  component: BorderedButton,
  title: 'Organisms/Bordered Button',
};

export default meta;
type Story = StoryObj<typeof BorderedButton>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => <BorderedButton label="Follow" onClick={() => {}} />,
};
