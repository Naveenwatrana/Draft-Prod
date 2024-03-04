import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import lang from 'common/lang';
import CreateButton from '.';

const { create } = lang.createContent;

describe('Create Button Component', () => {
  it('should render correctly and show create text on render', () => {
    const { getByText } = renderWithThemeStoreEvents(<CreateButton active={false} onClick={() => {}} />);
    expect(getByText(create)).toBeInTheDocument();
  });
  it('should call the onClick function when clicked', () => {
    const onClick = jest.fn();
    const { getByText } = renderWithThemeStoreEvents(<CreateButton active={false} onClick={onClick} />);
    getByText(create).click();
    expect(onClick).toHaveBeenCalled();
  });
});
