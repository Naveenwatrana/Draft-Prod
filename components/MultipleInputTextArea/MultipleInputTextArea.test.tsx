import { screen } from '@testing-library/react';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import MultipleInputTextArea from '.';

describe('MultipleInputTextArea', () => {
  it('should render the label and placeholder', () => {
    renderWithThemeStoreEvents(
      <MultipleInputTextArea
        label="Test Label"
        placeholder="Test Placeholder"
        onChange={() => {}}
        onInputChange={() => {}}
      />,
    );
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('Test Placeholder')).toBeInTheDocument();
  });
  it('should able to select multiple values', () => {
    renderWithThemeStoreEvents(
      <MultipleInputTextArea
        label="Test Label"
        placeholder="Test Placeholder"
        value={[
          { label: 'Label1', value: 'l1' },
          { label: 'Label2', value: 'l2' },
        ]}
        onChange={() => {}}
        onInputChange={() => {}}
      />,
    );
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.queryByText('Test Placeholder')).not.toBeInTheDocument();
    expect(screen.getByText('Label1')).toBeInTheDocument();
    expect(screen.getByText('Label2')).toBeInTheDocument();
  });
});
