import type { Meta, StoryObj } from '@storybook/react';

import CreateContentButton from '.';

const meta: Meta<typeof CreateContentButton> = {
  component: CreateContentButton,
  title: 'Molecules/Create Content Button',
};

export default meta;
type Story = StoryObj<typeof CreateContentButton>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => (
    <CreateContentButton
      positions={{
        right: 'auto', left: '0px', top: 'auto', bottom: 'auto',
      }}
    />
  ),
};
