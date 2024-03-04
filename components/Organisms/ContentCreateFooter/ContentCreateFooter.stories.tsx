import type { Meta, StoryObj } from '@storybook/react';

import ContentCreateFooter from '.';

const meta: Meta<typeof ContentCreateFooter> = {
  component: ContentCreateFooter,
  title: 'Organisms/Create Content Footer',
};

export default meta;
type Story = StoryObj<typeof ContentCreateFooter>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  render: () => <ContentCreateFooter nextDisabled={false} nextLabel="Next" onNext={() => {}} backDisabled={false} backLabel="Back" onBack={() => {}} />,
};

export const Disabled: Story = {
  render: () => <ContentCreateFooter nextDisabled nextLabel="Next" onNext={() => {}} backDisabled={false} backLabel="Back" onBack={() => {}} />,
};
