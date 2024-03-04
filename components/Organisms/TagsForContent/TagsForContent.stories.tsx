import type { Meta, StoryObj } from '@storybook/react';

import TagsForContent from '.';

const meta: Meta<typeof TagsForContent> = {
  component: TagsForContent,
  title: 'Organisms/Tags For Content',
};

export default meta;
type Story = StoryObj<typeof TagsForContent>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => <p>TODO: Implement Redux Add On for Storybook</p>,
};
