import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import CardStackCarousel from 'components/CardStack';

describe('CardStackCarousel', () => {
  const slides = [
    <div key={1}>Slide 1</div>,
    <div key={2}>Slide 2</div>,
    <div key={3}>Slide 3</div>,
  ];
  const width = 500;
  const height = 300;
  const cardType = 'company';
  const totalCardsinStack = slides.length;

  it('should render the correct number of slides', () => {
    renderWithThemeStoreEvents(
      <CardStackCarousel
        slides={slides}
        width={width}
        height={height}
        cardType={cardType}
        totalCardsinStack={totalCardsinStack}
      />,
    );
    expect(slides.length).toBe(3);
    slides.forEach((slide) => {
      expect(screen.getByText(slide.props.children)).toBeInTheDocument();
    });
  });

  it('should render the first card as active', () => {
    renderWithThemeStoreEvents(
      <CardStackCarousel
        slides={slides}
        width={350}
        height={550}
        cardType="company"
        totalCardsinStack={3}
      />,
    );
    const firstSlide = screen.getByText('Slide 1').parentElement;
    expect(firstSlide).toHaveClass('active');
  });

  // FIXME: This test is failing due to hover issue with styled component and RTL
  it.skip('should hide the card type, save icon, arrows when not hovering over the carousel in desktop view', () => {
    window.innerWidth = 1200;
    renderWithThemeStoreEvents(
      <CardStackCarousel
        slides={slides}
        width={350}
        height={550}
        cardType="company"
        totalCardsinStack={3}
      />,
    );
    const cardTypeElement = screen.getByText('COMPANY');
    const iconWrapper = screen.getByTestId('cardIcon');
    const leftArrow = screen.queryByTestId('Previous Slide');
    const rightArrow = screen.queryByTestId('Next Slide');
    expect(cardTypeElement).toHaveStyle({ display: 'none' });
    expect(iconWrapper).toHaveStyle({ display: 'none' });
    expect(leftArrow).toHaveStyle('display: none;');
    expect(rightArrow).toHaveStyle('display: none;');
  });

  it('should show card stack icon with the correct number of cards in desktop view', () => {
    renderWithThemeStoreEvents(
      <CardStackCarousel
        slides={slides}
        width={350}
        height={550}
        cardType="company"
        totalCardsinStack={3}
      />,
    );
    const iconWrapper = screen.getByTestId('cardstackIconWrapper');
    const svgElement = iconWrapper.querySelector('svg');
    expect(iconWrapper).toHaveTextContent('3');
    expect(svgElement).toBeInTheDocument();
  });

  it('should show card stack icon with the active card number and total number of cards on touch devices', () => {
    window.innerWidth = 320;
    renderWithThemeStoreEvents(
      <CardStackCarousel
        slides={slides}
        width={350}
        height={550}
        cardType="company"
        totalCardsinStack={3}
      />,
    );
    const iconWrapper = screen.getByTestId('cardstackIconWrapper');
    const svgElement = iconWrapper.querySelector('svg');
    expect(iconWrapper).toHaveTextContent('1/3');
    expect(svgElement).toBeInTheDocument();
  });

  it('should show the card type on touch devices', () => {
    window.innerWidth = 320;
    renderWithThemeStoreEvents(
      <CardStackCarousel
        slides={slides}
        width={350}
        height={550}
        cardType="company"
        totalCardsinStack={3}
      />,
    );
    const cardTypeElement = screen.getByText('COMPANY');
    expect(cardTypeElement).toHaveStyle({ display: 'block' });
  });

  it('should show the save icon on touch devices', () => {
    window.innerWidth = 320;
    renderWithThemeStoreEvents(
      <CardStackCarousel
        slides={slides}
        width={350}
        height={550}
        cardType="company"
        totalCardsinStack={3}
      />,
    );
    const iconWrapper = screen.getByTestId('cardIcon');
    const svgElement = iconWrapper.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('should show card stack icon with the active card number and total number of cards when hovering on desktop view', () => {
    window.innerWidth = 1024;
    renderWithThemeStoreEvents(
      <CardStackCarousel
        slides={slides}
        width={350}
        height={550}
        cardType="company"
        totalCardsinStack={3}
      />,
    );
    fireEvent.mouseEnter(screen.getByTestId('cardStackCarousel'));
    const iconWrapper = screen.getByTestId('cardstackIconWrapper');
    const svgElement = iconWrapper.querySelector('svg');
    expect(iconWrapper).toHaveTextContent('1/3');
    expect(svgElement).toBeInTheDocument();
  });

  it('should show the card type when hovering over the carousel on desktop view', () => {
    window.innerWidth = 1024;
    renderWithThemeStoreEvents(
      <CardStackCarousel
        slides={slides}
        width={350}
        height={550}
        cardType="company"
        totalCardsinStack={3}
      />,
    );
    fireEvent.mouseEnter(screen.getByTestId('cardStackCarousel'));
    const cardTypeElement = screen.getByText('COMPANY');
    expect(cardTypeElement).toHaveStyle({ display: 'block' });
  });

  it('should show the save icon when hovering over the carousel on desktop view', () => {
    window.innerWidth = 1024;
    renderWithThemeStoreEvents(
      <CardStackCarousel
        slides={slides}
        width={350}
        height={550}
        cardType="company"
        totalCardsinStack={3}
      />,
    );
    fireEvent.mouseEnter(screen.getByTestId('cardStackCarousel'));
    const iconWrapper = screen.getByTestId('cardIcon');
    const svgElement = iconWrapper.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
    expect(iconWrapper).toHaveStyle({ display: 'flex' });
  });

  // FIXME: Need to find a way to mock touched devices
  it.skip('should not show arrows on touch devices', () => {
    window.innerWidth = 320;
    renderWithThemeStoreEvents(
      <CardStackCarousel
        slides={slides}
        width={350}
        height={550}
        cardType="company"
        totalCardsinStack={3}
      />,
    );
    const leftArrow = screen.queryByTestId('Previous Slide');
    const rightArrow = screen.queryByTestId('Next Slide');
    expect(leftArrow).not.toBeInTheDocument();
    expect(rightArrow).not.toBeInTheDocument();
  });

  it('should not show arrows when hovering if there is only one slide on desktop view', () => {
    window.innerWidth = 1024;
    renderWithThemeStoreEvents(
      <CardStackCarousel
        slides={[slides[0]]}
        width={350}
        height={550}
        cardType="company"
        totalCardsinStack={1}
      />,
    );
    fireEvent.mouseEnter(screen.getByTestId('cardStackCarousel'));
    const leftArrow = screen.queryByTestId('Previous Slide');
    const rightArrow = screen.queryByTestId('Next Slide');
    expect(leftArrow).not.toBeInTheDocument();
    expect(rightArrow).not.toBeInTheDocument();
  });

  it('should hide the left arrow when hovering and on the first slide on desktop view', () => {
    window.innerWidth = 1024;
    renderWithThemeStoreEvents(
      <CardStackCarousel
        slides={slides}
        width={350}
        height={550}
        cardType="company"
        totalCardsinStack={3}
      />,
    );
    const firstSlide = screen.getByText('Slide 1').parentElement;
    expect(firstSlide).toHaveClass('active');
    fireEvent.mouseEnter(screen.getByTestId('cardStackCarousel'));
    const leftArrow = screen.queryByTestId('Previous Slide');
    expect(leftArrow).not.toBeInTheDocument();
  });

  // FIXME: This test is failing due to hover issue with styled component and RTL
  it.skip('should show the right arrow when hovering and on the first slide on desktop view', async () => {
    window.innerWidth = 1024;
    renderWithThemeStoreEvents(
      <CardStackCarousel
        slides={slides}
        width={350}
        height={550}
        cardType="company"
        totalCardsinStack={3}
      />,
    );
    const firstSlide = screen.getByText('Slide 1').parentElement;
    const carousel = screen.getByTestId('cardStackCarousel');
    expect(firstSlide).toHaveClass('active');
    fireEvent.mouseEnter(carousel);
    waitFor(() => {
      expect(carousel).toHaveStyle(':hover');
    });
    const rightArrow = screen.queryByTestId('Next Slide');
    expect(rightArrow).toBeInTheDocument();
  });

  // FIXME: This test is failing due to hover issue with styled component and RTL
  it.skip('should navigate to the next slide when the right arrow is clicked', () => {
    window.innerWidth = 1024;
    renderWithThemeStoreEvents(
      <CardStackCarousel
        slides={slides}
        width={350}
        height={550}
        cardType="company"
        totalCardsinStack={3}
      />,
    );
    const firstSlide = screen.getByText('Slide 1').parentElement;
    expect(firstSlide).toHaveClass('active');
    fireEvent.mouseEnter(screen.getByTestId('cardStackCarousel'));
    const rightArrow = screen.queryByTestId('Next Slide');
    expect(rightArrow).toBeInTheDocument();
    expect(rightArrow).toHaveStyle('display: flex;');
    if (rightArrow) {
      fireEvent.click(rightArrow);
    }
    const secondSlide = screen.getByText('Slide 2').parentElement;
    expect(secondSlide).toHaveClass('active');
  });

  // FIXME: This test is failing due to hover issue with styled component and RTL
  it.skip('should show both the left arrow and right arrow on hovering when not on the first slide or last slide on desktop view', () => {
    window.innerWidth = 1024;
    renderWithThemeStoreEvents(
      <CardStackCarousel
        slides={slides}
        width={350}
        height={550}
        cardType="company"
        totalCardsinStack={3}
      />,
    );
    const firstSlide = screen.getByText('Slide 1').parentElement;
    expect(firstSlide).toHaveClass('active');
    fireEvent.mouseEnter(screen.getByTestId('cardStackCarousel'));
    const rightArrow = screen.queryByTestId('Next Slide');
    expect(rightArrow).toBeInTheDocument();
    expect(rightArrow).toHaveStyle('display: flex;');
    if (rightArrow) {
      fireEvent.click(rightArrow);
    }
    const secondSlide = screen.getByText('Slide 2').parentElement;
    expect(secondSlide).toHaveClass('active');
    fireEvent.mouseEnter(screen.getByTestId('cardStackCarousel'));
    const leftArrow = screen.queryByTestId('Previous Slide');
    expect(leftArrow).toBeInTheDocument();
    expect(leftArrow).toHaveStyle('display: flex;');
    expect(rightArrow).toBeInTheDocument();
    expect(rightArrow).toHaveStyle('display: flex;');
    if (rightArrow) {
      fireEvent.click(rightArrow);
    }
    const thirdSlide = screen.getByText('Slide 3').parentElement;
    expect(thirdSlide).toHaveClass('active');
    fireEvent.mouseEnter(screen.getByTestId('cardStackCarousel'));
    expect(leftArrow).toBeInTheDocument();
    expect(leftArrow).toHaveStyle('display: flex;');
  });

  // FIXME: This test is failing due to hover issue with styled component and RTL
  it.skip('should hide the right arrow and show left arrow when hovering and on the last slide on desktop view', () => {
    window.innerWidth = 1024;
    renderWithThemeStoreEvents(
      <CardStackCarousel
        slides={slides}
        width={350}
        height={550}
        cardType="company"
        totalCardsinStack={3}
      />,
    );
    const firstSlide = screen.getByText('Slide 1').parentElement;
    expect(firstSlide).toHaveClass('active');
    fireEvent.mouseEnter(screen.getByTestId('cardStackCarousel'));
    const rightArrow = screen.queryByTestId('Next Slide');
    expect(rightArrow).toBeInTheDocument();
    expect(rightArrow).toHaveStyle('display: flex;');
    if (rightArrow) {
      fireEvent.click(rightArrow);
    }
    const secondSlide = screen.getByText('Slide 2').parentElement;
    expect(secondSlide).toHaveClass('active');
    fireEvent.mouseEnter(screen.getByTestId('cardStackCarousel'));
    expect(rightArrow).toBeInTheDocument();
    expect(rightArrow).toHaveStyle('display: flex;');
    if (rightArrow) {
      fireEvent.click(rightArrow);
    }
    const thirdSlide = screen.getByText('Slide 3').parentElement;
    expect(thirdSlide).toHaveClass('active');
    fireEvent.mouseEnter(screen.getByTestId('cardStackCarousel'));
    expect(rightArrow).toBeInTheDocument();
    expect(rightArrow).toHaveStyle('display: none;');
    const leftArrow = screen.queryByTestId('Previous Slide');
    expect(leftArrow).toBeInTheDocument();
    expect(leftArrow).toHaveStyle('display: flex;');
  });

  // FIXME: This test is failing due to hover issue with styled component and RTL
  it.skip('should navigate to the previous slide when the left arrow is clicked', () => {
    window.innerWidth = 1024;
    renderWithThemeStoreEvents(
      <CardStackCarousel
        slides={slides}
        width={350}
        height={550}
        cardType="company"
        totalCardsinStack={3}
      />,
    );
    const firstSlide = screen.getByText('Slide 1').parentElement;
    expect(firstSlide).toHaveClass('active');
    fireEvent.mouseEnter(screen.getByTestId('cardStackCarousel'));
    const rightArrow = screen.queryByTestId('Next Slide');
    expect(rightArrow).toBeInTheDocument();
    expect(rightArrow).toHaveStyle('display: flex;');
    if (rightArrow) {
      fireEvent.click(rightArrow);
    }
    const secondSlide = screen.getByText('Slide 2').parentElement;
    expect(secondSlide).toHaveClass('active');
    fireEvent.mouseEnter(screen.getByTestId('cardStackCarousel'));
    const leftArrow = screen.queryByTestId('Previous Slide');
    expect(leftArrow).toBeInTheDocument();
    expect(leftArrow).toHaveStyle('display: flex;');
    if (leftArrow) {
      fireEvent.click(leftArrow);
    }
    expect(firstSlide).toHaveClass('active');
  });

  // TODO: Add tests for swipe functionality
});
