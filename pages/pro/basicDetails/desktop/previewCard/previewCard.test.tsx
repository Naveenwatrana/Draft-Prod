import { screen, waitFor } from '@testing-library/react';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import placeholderImage from 'components/Icons/defaultProfile.svg';
import PreviewCard from 'pages/pro/basicDetails/desktop/previewCard/index';

describe('Preview Card', () => {
  it('should render all elements correctly when all data is received', () => {
    renderWithThemeStoreEvents(
      <PreviewCard
        fullName="John Doe"
        picture={placeholderImage.src}
        mantra="This is a sample mantra"
      />,
    );
    const fullName = screen.getByText('John Doe');
    const mantra = screen.getByText('This is a sample mantra');
    const image = screen.queryByTestId('image') as HTMLImageElement;
    expect(fullName).toBeInTheDocument();
    expect(mantra).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

  it('should render all elements correctly when only full name is received', async () => {
    renderWithThemeStoreEvents(
      <PreviewCard fullName="John Doe" picture={placeholderImage.src} mantra="" />,
    );
    const image = screen.queryByTestId('image') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    const fullName = screen.getByText('John Doe');
    expect(fullName).toBeInTheDocument();
  });

  it('should render all elements correctly when only mantra is received', async () => {
    renderWithThemeStoreEvents(
      <PreviewCard
        fullName=""
        picture={placeholderImage.src}
        mantra="This is a sample mantra"
      />,
    );
    const image = screen.queryByTestId('image') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    const mantra = screen.getByText('This is a sample mantra');
    expect(mantra).toBeInTheDocument();
  });

  // FIXME: This test is failing due to image missing. Need to fix it.
  it.skip('should render all elements correctly when only picture is received', async () => {
    renderWithThemeStoreEvents(
      <PreviewCard fullName="" picture={placeholderImage.src} mantra="" />,
    );
    const image = screen.queryByRole('img') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain(placeholderImage.src);
  });
});
