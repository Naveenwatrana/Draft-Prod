import { renderWithThemeStoreEvents } from 'common/utils/testHelpers';
import lang from 'common/lang';
import { InputType } from 'components/inputComp/types';
import DraftUrlInput from '.';

const {
  organization: { draftUrlPath },
} = lang;
const labelText = 'Test';
describe('Create Button Component', () => {
  it('should render correctly and show create text on render', () => {
    const { getByText } = renderWithThemeStoreEvents(
      <DraftUrlInput
        labelText={labelText}
        type={InputType.TEXT}
        id="organizationURL"
        register={jest.fn()}
      />,
    );
    expect(getByText(draftUrlPath)).toBeInTheDocument();
    expect(getByText(labelText)).toBeInTheDocument();
  });
});
