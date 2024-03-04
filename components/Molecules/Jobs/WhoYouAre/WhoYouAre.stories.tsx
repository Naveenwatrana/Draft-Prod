import { Meta, StoryObj } from '@storybook/react';
import WhoYouAre from '.';

const meta: Meta<typeof WhoYouAre> = {
  component: WhoYouAre,
  title: 'Molecules/Jobs/WhoYouAre',
};

type Story = StoryObj<typeof WhoYouAre>;

export const Primary: Story = {
  args: {
    salaryFrom: 1000,
    salaryTo: 2000,
    oteFrom: 1000,
    oteTo: 2000,
    employmentType: {
      label: 'Full Time',
      value: 'fullTime',
    },
    languages: [{
      label: 'English',
      value: 'english',
    }, {
      label: 'Spanish',
      value: 'spanish',
    }],
    requirements: ['English', 'Spanish'],
    matched: ['salaryFrom', 'employmentType'],
    languageMatched: ['English', 'Spanish'],
  },
};

export default meta;
