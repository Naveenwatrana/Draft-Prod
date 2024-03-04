import { screen } from '@testing-library/react';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import PlaceholderImage from '/public/images/defaultProfile.png';
import PreviewCard from 'pages/pro/onboarding/desktop/previewCard/index';

describe('Preview Card', () => {
  it('should render all elements correctly when fullname is received', () => {
    renderWithThemeStoreEvents(
      <PreviewCard
        fullName="John Doe"
        picture={PlaceholderImage.src}
        mantra=""
        bio=""
        currentStep="1"
      />,
    );
    const fullName = screen.getByText('John Doe');
    const image = screen.getByTestId('image');
    expect(fullName).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  it('should render all elements correctly when mantra is received', async () => {
    renderWithThemeStoreEvents(
      <PreviewCard
        fullName="John Doe"
        picture={PlaceholderImage.src}
        mantra="This is a sample mantra"
        bio=""
        currentStep="2"
      />,
    );
    const fullName = screen.getByText('John Doe');
    const image = screen.getByTestId('image') as HTMLImageElement;
    expect(fullName).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    const mantra = screen.getByText('This is a sample mantra');
    expect(mantra).toBeInTheDocument();
  });

  it('should render only bio/fullname and not render mantra/image when bio is received', async () => {
    renderWithThemeStoreEvents(
      <PreviewCard
        fullName="John Doe"
        picture={PlaceholderImage.src}
        mantra="This is a sample mantra"
        bio="This is a sample bio"
        currentStep="3"
      />,
    );
    const fullName = screen.getByText('John Doe');
    expect(fullName).toBeInTheDocument();
    const bio = screen.getByText('This is a sample bio');
    expect(bio).toBeInTheDocument();
    expect(() => screen.getByText('This is a sample mantra')).toThrow();
    expect(() => screen.getByTestId('image')).toThrow();
  });
});
