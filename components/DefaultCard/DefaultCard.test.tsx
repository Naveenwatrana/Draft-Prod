import { screen, fireEvent } from '@testing-library/react';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import DefaultCard from '.';

describe('CardStackCarousel', () => {
  const primaryText = 'Primary Text';
  const secondaryText = 'Secondary Text';
  const tertiaryText = 'Tertiary Text';
  const longText = 'Long Text';
  const cover = 'https://static.vecteezy.com/system/resources/thumbnails/000/562/477/small/82862553.jpg';
  const onClick = jest.fn();
  const icon = 'https://static.vecteezy.com/system/resources/thumbnails/000/562/477/small/82862553.jpg';
  const links = [
    {
      name: 'Link 1',
      url: 'https://www.google.com',
    },
    {
      name: 'Link 2',
      url: 'https://www.google.com',
    },
  ];
  const projects = [
    {
      name: 'ABC Company',
      role: 'CEO',
      duration: {
        from: 2010,
        to: 2015,
      },
    },
    {
      name: 'XYZ Company',
      role: 'CTO',
      duration: {
        from: 2015,
        to: 2020,
      },
    },
  ];
  const range = {
    from: 75000,
    to: 150000,
  };

  it('renders info type card correctly', () => {
    renderWithThemeStoreEvents(
      <DefaultCard
        primaryText={primaryText}
        secondaryText={secondaryText}
        type="info"
        cover={cover}
        icon="https://static.vecteezy.com/system/resources/thumbnails/000/562/477/small/82862553.jpg"
      />,
    );
    const cardContainer = screen.getByTestId('cardContainer');
    expect(screen.getByText(primaryText)).toBeInTheDocument();
    expect(screen.getByText(secondaryText)).toBeInTheDocument();
    expect(cardContainer).toHaveStyle(`background-image: url(${cover})`);
    expect(screen.getByTestId('cardLogo')).toHaveAttribute('src', icon);
  });

  it('renders job type card correctly', () => {
    renderWithThemeStoreEvents(
      <DefaultCard
        primaryText={primaryText}
        secondaryText={secondaryText}
        tertiaryText={tertiaryText}
        icon="https://static.vecteezy.com/system/resources/thumbnails/000/562/477/small/82862553.jpg"
        type="job"
        range={range}
      />,
    );
    expect(screen.getByText(primaryText)).toBeInTheDocument();
    expect(screen.getByText(secondaryText)).toBeInTheDocument();
    expect(screen.getByText('$75,000 - $150,000')).toBeInTheDocument();
    expect(screen.getByTestId('cardLogo')).toHaveAttribute('src', icon);
  });
  it('renders about type card correctly', () => {
    renderWithThemeStoreEvents(
      <DefaultCard
        primaryText={primaryText}
        type="about"
        longText={longText}
      />,
    );
    expect(screen.getByText(primaryText)).toBeInTheDocument();
    expect(screen.getByText(longText)).toBeInTheDocument();
  });
  it('renders post type card correctly', () => {
    renderWithThemeStoreEvents(
      <DefaultCard
        primaryText={primaryText}
        secondaryText={secondaryText}
        tertiaryText={tertiaryText}
        type="post"
        cover={cover}
      />,
    );
    const cardContainer = screen.getByTestId('cardContainer');
    expect(screen.getByText(primaryText)).toBeInTheDocument();
    expect(screen.getByText(secondaryText)).toBeInTheDocument();
    expect(cardContainer).toHaveStyle(`background-image: url(${cover})`);
  });
  it('renders article type card correctly', () => {
    renderWithThemeStoreEvents(
      <DefaultCard
        primaryText={primaryText}
        secondaryText={secondaryText}
        tertiaryText={tertiaryText}
        type="article"
        cover={cover}
      />,
    );
    const cardContainer = screen.getByTestId('cardContainer');
    expect(screen.getByText(primaryText)).toBeInTheDocument();
    expect(screen.getByText(secondaryText)).toBeInTheDocument();
    expect(cardContainer).toHaveStyle(`background-image: url(${cover})`);
    expect(cardContainer).toHaveStyle(`background-size: cover`);
  });
  it('renders link type card correctly', () => {
    renderWithThemeStoreEvents(
      <DefaultCard primaryText={primaryText} type="link" links={links} />,
    );
    expect(screen.getByText(primaryText)).toBeInTheDocument();
    expect(screen.getByText('Link 1')).toBeInTheDocument();
    expect(screen.getByText('Link 2')).toBeInTheDocument();
  });
  it('renders project type card correctly', () => {
    renderWithThemeStoreEvents(
      <DefaultCard
        primaryText={primaryText}
        type="project"
        projects={projects}
      />,
    );
    expect(screen.getByText(primaryText)).toBeInTheDocument();
    expect(screen.getByText('2010 - 2015')).toBeInTheDocument();
    expect(screen.getByText('ABC Company')).toBeInTheDocument();
    expect(screen.getByText('CEO')).toBeInTheDocument();
    expect(screen.getByText('2015 - 2020')).toBeInTheDocument();
    expect(screen.getByText('XYZ Company')).toBeInTheDocument();
    expect(screen.getByText('CTO')).toBeInTheDocument();
  });
});
