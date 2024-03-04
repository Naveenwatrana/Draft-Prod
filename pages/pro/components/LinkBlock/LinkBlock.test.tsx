import { screen } from '@testing-library/react';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import lang from 'common/lang';
import LinkBlock from '.';

const {
  profile: {
    link: {
      editLinkForm: {
        moreBtnLabel,
      },
    },
  },
} = lang;

describe('LinkBlock', () => {
  const data = {
    title: 'test',
    description: 'test',
    url: 'https://www.example.com',
    media: 'https://example.com/image.png',
    domain: 'https://www.example.com',
  };
  jest.mock('pages/api/link/utils');
  jest.mock('common/lang');

  const extractGithubUsername = jest.fn();
  extractGithubUsername.mockReturnValue('user123');

  test('Renders generic link for non-Github link', () => {
    // const data = { url: 'https://www.example.com' };
    renderWithThemeStoreEvents(<LinkBlock
      data={data}
      setEditBlock={() => false}
      editOnClick={false}
      width={2}
      height={2}
    />);

    const link = screen.getByTestId('linkBlock');
    expect(link).toHaveAttribute('href', 'https://www.example.com');
    expect(screen.getByText(moreBtnLabel)).toBeInTheDocument();
  });

  test('Renders image if media prop is provided', () => {
    renderWithThemeStoreEvents(<LinkBlock
      data={data}
      setEditBlock={() => false}
      editOnClick={false}
      width={2}
      height={2}
    />);

    const image = screen.getByTestId('linkImage');
    expect(image).toHaveAttribute('src', 'https://example.com/image.png');
  });

  test('Hides image when width and height are both minLength', () => {
    renderWithThemeStoreEvents(<LinkBlock
      data={data}
      setEditBlock={() => false}
      editOnClick={false}
      width={1}
      height={1}
    />);

    expect(screen.getByTestId('linkImage')).toHaveStyle('display: none');
  });

  test('Renders title if title prop is provided', () => {
    renderWithThemeStoreEvents(<LinkBlock
      data={data}
      setEditBlock={() => false}
      editOnClick={false}
      width={2}
      height={2}
    />);

    expect(screen.getByTestId('linkBlockTitle')).toHaveTextContent(data?.title);
  });

  test('Renders description if description prop is provided', () => {
    renderWithThemeStoreEvents(<LinkBlock
      data={data}
      setEditBlock={() => false}
      editOnClick={false}
      width={2}
      height={2}
    />);

    expect(screen.getByTestId('linkBlockDescription')).toHaveTextContent(data?.description);
  });
});
