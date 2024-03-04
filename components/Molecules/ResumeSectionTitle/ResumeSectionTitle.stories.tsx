import type { Meta, StoryObj } from '@storybook/react';
import ResumeSectionTitle from '.';

const meta: Meta<typeof ResumeSectionTitle> = {
  component: ResumeSectionTitle,
  title: 'Molecules/Resume Section Title',
};

export default meta;
type Story = StoryObj<typeof ResumeSectionTitle>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => <ResumeSectionTitle isAddEnable={false} title="Follow" onClick={() => {}} />,
};
