import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import { fireEvent, screen } from '@testing-library/react';
import CheckboxSelect from '.';
const items = [
  { label: 'facebook', value: 'facebook' },
  { value: 'twitter', label: 'twitter' },
  { value: 'instagram', label: 'instagram' },
];
const label = 'Source Type';
describe('CheckboxSelect', () => {
  it('should render', () => {
    const onSelect = jest.fn();
    renderWithThemeStoreEvents(
      <CheckboxSelect
        items={items}
        selected={[]}
        onSelect={onSelect}
        selectLabel={label}
      />,
    );
    expect(screen.getByText(`${label} (0)`)).toBeInTheDocument();
  });
  it('should open and close popover', () => {
    const onSelect = jest.fn();
    renderWithThemeStoreEvents(
      <CheckboxSelect
        items={items}
        selected={[]}
        onSelect={onSelect}
        selectLabel={label}
      />,
    );
    const select = screen.getByTestId('selectCheckboxDropdown');
    expect(select).toBeInTheDocument();
    fireEvent.click(select);
    expect(screen.getByText('instagram')).toBeInTheDocument();
    fireEvent.click(select);
    expect(screen.queryByText('instagram')).not.toBeInTheDocument();
  });
});
