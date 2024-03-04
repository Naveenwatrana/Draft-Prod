import { screen } from '@testing-library/react';
import { renderWithTheme } from 'common/utils/testHelpers';
import Filters from '.';
const filters = [
  { filter: 'filter1', label: 'Filter1', active: true },
  { filter: 'filter2', label: 'Filter2', active: true },
];
describe('Filters Component', () => {
  it('should render the component', () => {
    renderWithTheme(<Filters onActive={() => {}} filters={filters} />);
    filters.forEach((filter) => expect(screen.getByText(filter.label)).toBeInTheDocument());
  });
  it('should activate and deactivate the filter', () => {
    const mockFn = jest.fn();
    renderWithTheme(<Filters onActive={mockFn} filters={filters} />);
    screen.getByText(filters[0].label).click();
    screen.getByText(filters[0].label).click();
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});
