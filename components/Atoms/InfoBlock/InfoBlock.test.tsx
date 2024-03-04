import { screen } from '@testing-library/react';
import { renderWithTheme } from 'common/utils/testHelpers';
import { InfoBlock } from '.';
import Description from './Description';
const info = 'Test Information';
const title = 'Test Title';
describe('InfoBlock Component', () => {
  it('should render the component', () => {
    renderWithTheme(<InfoBlock info={info} title={title} />);
    expect(screen.getByText(info)).toBeInTheDocument();
    expect(screen.getByText(title)).toBeInTheDocument();
  });
  it('should render the component without title', () => {
    renderWithTheme(<InfoBlock info={info} />);
    expect(screen.getByText(info)).toBeInTheDocument();
  });
  it('should not render the component without info', () => {
    const { container } = renderWithTheme(<InfoBlock info="" title={title} />);
    expect(container.childElementCount).toBe(0);
  });
});
describe('Description Component', () => {
  it('should render the component', () => {
    renderWithTheme(<Description content={info} />);
    expect(screen.getByText(info)).toBeInTheDocument();
  });
});
