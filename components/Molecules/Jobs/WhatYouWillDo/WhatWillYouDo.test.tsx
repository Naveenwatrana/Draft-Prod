import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import '@testing-library/jest-dom/extend-expect';
import WhatWillYouDo from '.';

describe('WhatWillYouDo', () => {
  it('renders expected values', () => {
    const roleType = { label: 'Role Type', value: 'roleType' };
    const range = { label: 'Range', value: 'range' };
    const workStyle = { label: 'Work Style', value: 'workStyle' };
    const location = { label: 'india', value: 'india' };
    const minimumDays = { value: '2', label: 'minimumDays' };
    const maximumDays = { value: '10', label: 'maximumDays' };
    const addMore = ['some'];

    renderWithThemeStoreEvents(
      <WhatWillYouDo
        addMore={addMore}
        roleType={roleType}
        range={range}
        workStyle={workStyle}
        location={location}
        minimumDays={minimumDays}
        maximumDays={maximumDays}
      />,
    );

    expect(screen.getByText(roleType.label)).toBeInTheDocument();
    expect(screen.getByText(range.label)).toBeInTheDocument();
    expect(screen.getByText(workStyle.label)).toBeInTheDocument();
    expect(screen.getByText(`${minimumDays.value} to ${maximumDays.value} days`)).toBeInTheDocument();
  });
});
