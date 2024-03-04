import { screen } from '@testing-library/react';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import AboutCardIcon from 'components/Icons/AboutCardIcon';
import AddNewCardWorkArea from '.';

describe('Add New Card Work area component component', () => {
  it('should render the cards list', () => {
    const cards = [{
      id: 1,
      title: 'About Card',
      icon: <AboutCardIcon />,
      description: 'Go beyond',

    }];
    renderWithThemeStoreEvents(
      <AddNewCardWorkArea
        cardData={cards}
      />,
    );
    expect(screen.getByText('About Card')).toBeInTheDocument();
    expect(screen.getByText('Go beyond')).toBeInTheDocument();
  });
});
