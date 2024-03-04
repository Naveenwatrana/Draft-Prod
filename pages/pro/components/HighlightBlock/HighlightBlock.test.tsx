import { screen } from '@testing-library/react';
import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import lang from 'common/lang';
import HighlightBlock from '.';

const {
  profile: {
    block: {
      highlight: { title: highlightTitle },
    },
  },
} = lang;

describe('HighlightBlock', () => {
  it('should render the component', () => {
    renderWithThemeStoreEvents(<HighlightBlock
      block={{
        id: 'test',
        type: 'test',
        sort: 1,
        fields: {
          title: 'test',

        },
      }}
      onClose={() => {}}
      numberOfBlocks={1}
    />);
    expect(screen.getByText(highlightTitle)).toBeInTheDocument();
  });
});
