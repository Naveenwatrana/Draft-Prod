import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import { LoggedInUser } from 'context/loggedInUserContext';
import lang from 'common/lang';
import FollowButton from '.';

const { follow, unFollow } = lang.followUsers;

describe('FollowButton', () => {
  it('should render', () => {
    const mockFn = jest.fn();
    expect(<FollowButton isFollowing={false} onClick={mockFn} />).toBeTruthy();
  });
  it('should render correct following state', () => {
    const mockFn = jest.fn();
    renderWithThemeStoreEvents(<FollowButton isFollowing={false} onClick={mockFn} />);
    expect(screen.getByText(follow)).toBeTruthy();
  });
  it('should render correct un follow state', () => {
    const mockFn = jest.fn();
    renderWithThemeStoreEvents(<FollowButton isFollowing onClick={mockFn} />);
    expect(screen.getByText(unFollow)).toBeTruthy();
  });
  it('Should call the onclick function', () => {
    const mockFn = jest.fn();
    renderWithThemeStoreEvents(
      <LoggedInUser.Provider value={true}>
        <FollowButton isFollowing={false} onClick={mockFn} />
      </LoggedInUser.Provider>,
    );
    fireEvent.click(screen.getByText(follow));
    expect(mockFn).toHaveBeenCalled();
  });
  it('should change the text on click', () => {
    const mockFn = jest.fn();
    renderWithThemeStoreEvents(
      <LoggedInUser.Provider value={true}>
        <FollowButton isFollowing={false} onClick={mockFn} />
      </LoggedInUser.Provider>,
    );
    fireEvent.click(screen.getByText(follow));
    waitFor(() => expect(screen.getByText(unFollow)).toBeTruthy());
  });
});
