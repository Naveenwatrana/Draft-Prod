import { screen, waitFor } from '@testing-library/react';
import lang from 'common/lang';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import CreateArticleStep3 from './index';

jest.mock('next/router', () => ({
  useRouter() {
    return ({
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    });
  },
}));

// Mocks for IntersectionObserver and ResizeObserver
const observe = jest.fn();
const unobserve = jest.fn();
const disconnect = jest.fn();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.IntersectionObserver = jest.fn(() => ({
  observe,
  unobserve,
  disconnect,
}));
window.ResizeObserver = jest.fn(() => ({
  observe,
  unobserve,
  disconnect,
}
));

const {
  article: {
    publishArticle,
  },
} = lang;
describe.skip('Create article Step 3', () => {
  it('should render the publish article button', () => {
    const articleData = {
      data: {
        content: 'something',
        creator: {},
        published_date: '',
        id: '',
        saved: false,
        cards: [],
        upvotes: [],
        tags: [],
      },
    };
    const moreLikeThisData = {
      data: {
        data: {},
      },
    };
    renderWithThemeStoreEvents(
      <CreateArticleStep3
        articleData={articleData}
        commentsData={[]}
        moreLikeThisData={moreLikeThisData}
      />,
    );
    waitFor(() => expect(screen.getByText(publishArticle)).toBeInTheDocument());
  });
});
