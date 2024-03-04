import { screen } from '@testing-library/react';
import Stepper from 'components/Stepper';
import { renderWithTheme } from 'common/utils/testHelpers';

const steps = ['Step1', 'Step2', 'Step3'];

describe('Stepper Component', () => {
  it('should render the all the step with count numbers', () => {
    renderWithTheme(<Stepper steps={steps} activeStep={1} />);
    steps.forEach((step, index) => {
      expect(screen.getByText(step)).toBeInTheDocument();
      expect(screen.getByText(index + 1)).toBeInTheDocument();
    });
  });
});
