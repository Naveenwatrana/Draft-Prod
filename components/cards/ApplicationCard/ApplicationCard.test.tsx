import { fireEvent, screen } from '@testing-library/react';
import lang from 'common/lang';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import ApplicationCard from '.';
import ApplicationDetailsCard from './Details';

describe('ApplicationCard', () => {
  it('should render all elements correctly', () => {
    const companyName = 'Roblox';
    const role = 'Software Developer';
    const {
      workspace: { jobDetails },
    } = lang;
    const onClick = jest.fn();
    renderWithThemeStoreEvents(
      <ApplicationCard
        companyName={companyName}
        role={role}
        onViewJobDetails={onClick}
      />,
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByText(companyName)).toBeInTheDocument();
    expect(screen.getByText(role)).toBeInTheDocument();
    expect(screen.getByText(jobDetails)).toBeInTheDocument();
  });
});
describe('ApplicationDetailsCard', () => {
  it('should render all elements correctly', () => {
    const companyName = 'Roblox';
    const text = 'Test Text';
    const {
      workspace: { jobDetails },
    } = lang;
    const onClick = jest.fn();
    renderWithThemeStoreEvents(
      <ApplicationDetailsCard
        companyName={companyName}
        text={text}
        onViewJobDetails={onClick}
      />,
    );
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByText(companyName)).toBeInTheDocument();
    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByText(jobDetails)).toBeInTheDocument();
  });
});
