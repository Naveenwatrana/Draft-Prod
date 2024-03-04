import { Meta, StoryObj } from '@storybook/react';
import SkillsYouHave from '.';

const meta: Meta<typeof SkillsYouHave> = {
  component: SkillsYouHave,
  title: 'Molecules/Jobs/SkillsYouHave',
};

type Story = StoryObj<typeof SkillsYouHave>;

export const Primary: Story = {
  args: {
    isOrgProfile: false,
    skillMatched: [{ id: '1', tag: 'React', type: 'skill' }, { id: '2', tag: 'Node', type: 'skill' }],
    skillNotMatched: ['React'],
  },
};

export default meta;
