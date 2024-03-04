import type { Meta, StoryObj } from '@storybook/react';

import CreateButton from '.';

const meta: Meta<typeof CreateButton> = {
  component: CreateButton,
  title: 'DesignSystem/CreateButton',
};

export default meta;
type Story = StoryObj<typeof CreateButton>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => <CreateButton active={false} onClick={() => {}} />,
};
