import { Meta, StoryObj } from '@storybook/react';
import WhatYouWillDo from '.';

const meta: Meta<typeof WhatYouWillDo> = {
  component: WhatYouWillDo,
  title: 'Molecules/Jobs/WhatYouWillDo',
};

type Story = StoryObj<typeof WhatYouWillDo>;

export const Primary: Story = {
  args: {
    roleType: {
      label: 'Full Time',
      value: 'fullTime',
    },
    range: {
      label: '0-10',
      value: '0-10',
    },
    workStyle: {
      label: 'Remote',
      value: 'remote',
    },
    location: {
      label: 'London',
      value: 'london',
    },
    minimumDays: {
      label: '0',
      value: '0',
    },
    maximumDays: {
      label: '10',
      value: '10',
    },
    matched: ['roleType', 'range', 'workStyle', 'location', 'minimumDays'],
    addMore: ['Add more'],
  },
};

export default meta;
