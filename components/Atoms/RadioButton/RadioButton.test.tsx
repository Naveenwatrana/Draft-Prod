import { fireEvent, screen } from '@testing-library/react';
import { renderWithTheme } from 'common/utils/testHelpers';
import RadioButton from '.';

const steps = ['Step1', 'Step2', 'Step3'];

describe('RadioButton Component', () => {
  const mockFn = jest.fn();
  it('should render the radio button with label', () => {
    renderWithTheme(
      <RadioButton
        label={steps[0]}
        onCheck={mockFn}
        checked={false}
        name="role"
      />,
    );
    expect(screen.getByText(steps[0])).toBeInTheDocument();
    const checkbox = screen.getByTestId('radio-button-Step1role');
    expect(checkbox).toBeInTheDocument();
  });
  it('should check the radio button', () => {
    renderWithTheme(
      <>
        <RadioButton
          label={steps[0]}
          onCheck={mockFn}
          checked={false}
          name="role"
        />
        <RadioButton
          label={steps[1]}
          onCheck={mockFn}
          checked={true}
          name="role"
        />
      </>,
    );
    expect(screen.getByText(steps[0])).toBeInTheDocument();
    const checkbox = screen.getByTestId('radio-button-Step1role');
    expect(checkbox).toBeInTheDocument();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
