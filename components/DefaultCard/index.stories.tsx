import type { Meta, StoryObj } from '@storybook/react';

import DefaultCard from '.';

const meta: Meta<typeof DefaultCard> = {
  component: DefaultCard,
  title: 'DesignSystem/DefaultCard',
};

export default meta;
type Story = StoryObj<typeof DefaultCard>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => <DefaultCard type="info" primaryText='Sarab Singh' secondaryText='This is my mantra' />,
};
