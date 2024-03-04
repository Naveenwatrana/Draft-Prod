import { screen } from '@testing-library/react';
import { renderWithTheme } from 'common/utils/testHelpers';
import PriceRange from '.';
import PriceInput from './PriceInput';

describe('PriceRange Component', () => {
  it('should render the component', () => {
    const onChange = jest.fn();
    renderWithTheme(
      <PriceRange
        range={[40000, 50000]}
        dataCys={['from', 'to']}
        onRangeChange={onChange}
      />,
    );
    expect(screen.getByDisplayValue('$40,000')).toBeInTheDocument();
    expect(screen.getByDisplayValue('$50,000')).toBeInTheDocument();
  });
  it('should not render the 0', () => {
    const onChange = jest.fn();
    renderWithTheme(
      <PriceRange
        range={[40000, 0]}
        dataCys={['from', 'to']}
        onRangeChange={onChange}
      />,
    );
    expect(screen.getByDisplayValue('$40,000')).toBeInTheDocument();
    expect(screen.getByDisplayValue('')).toBeInTheDocument();
  });
});

describe('PriceInput Component', () => {
  it('should render the component', () => {
    const onChange = jest.fn();
    renderWithTheme(
      <PriceInput value={50000} onChange={onChange} id="" label="Input" />,
    );
    expect(screen.getByDisplayValue('$50,000')).toBeInTheDocument();
    expect(screen.getByText('Input')).toBeInTheDocument();
  });
  it('should render the error component', () => {
    const onChange = jest.fn();
    renderWithTheme(
      <PriceInput
        value={50000}
        onChange={onChange}
        id=""
        label="Input"
        error={{ type: 'max', message: 'Error Message' }}
      />,
    );
    expect(screen.getByDisplayValue('$50,000')).toBeInTheDocument();
    expect(screen.getByText('Input')).toBeInTheDocument();
    expect(screen.getByText('Error Message')).toBeInTheDocument();
  });
});
