import { render, screen } from '@testing-library/react';
import ArticleCardMenu from './ArticleCardMenu';

describe('ArticleCardMenu', () => {
  it('should render the children', () => {
    render(
      <ArticleCardMenu>
        <p>Hello</p>
      </ArticleCardMenu>,
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
