import { screen } from '@testing-library/react';
import lang from 'common/lang';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import InfoSection from '.';

const { article } = lang;

describe('Info Section Component', () => {
  it('should render publish button', () => {
    const authorInfo = { first_name: '', last_name: '', presigned_profile_cover: '' };
    renderWithThemeStoreEvents(
      <InfoSection authorInfo={authorInfo} publishInfo="12 April 2020" />,
    );
    expect(screen.getByText(article.followButtonLabel)).toBeInTheDocument();
  });
  it('should not render publish button', () => {
    const authorInfo = { first_name: '', last_name: '', presigned_profile_cover: '' };
    renderWithThemeStoreEvents(
      <InfoSection authorInfo={authorInfo} publishInfo="12 April 2020" userIsAuthor />,
    );
    expect(screen.queryByText(article.followButtonLabel)).not.toBeInTheDocument();
  });
});
