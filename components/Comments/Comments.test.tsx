import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import lang from 'common/lang';
import Comments from '.';
import { IComment } from './types';
const {
  comments: { noComment },
} = lang;
const user = {
  id: '0',
  firstName: 'John',
  lastName: 'Doe',
  profileCover: '',
  name: 'John Doe',
  presignedProfileCover: '',
};

const comments: IComment[] = [
  {
    id: 0,
    comment: 'Test Comment 1',
    userId: 0,
    updatedAt: '2023-01-25T05:16:04.000000Z',
    createdAt: '2023-01-25T05:16:04.000000Z',
    commenter: user,
  },
];

describe('Comments', () => {
  it('should render the comment', () => {
    renderWithThemeStoreEvents(
      <Comments data={comments} postComment={jest.fn} />,
    );
    fireEvent.click(screen.getByTestId('commentsIcon'));
    waitFor(() => {
      expect(screen.getByText('Add Comment')).toBeInTheDocument();
      expect(screen.getByText('Comments(1)')).toBeInTheDocument();
      expect(screen.getByText('Test Comment 1')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });
  it('should render the no comment message', () => {
    renderWithThemeStoreEvents(
      <Comments data={[]} postComment={jest.fn} />,
    );
    expect(screen.getByText('Add Comment')).toBeInTheDocument();
    expect(screen.getByText('Comments')).toBeInTheDocument();
    expect(screen.getByText(noComment)).toBeInTheDocument();
  });
});
