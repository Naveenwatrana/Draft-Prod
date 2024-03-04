import lang from 'common/lang';
import { renderWithTheme } from 'common/utils/testHelpers';
import { screen } from '@testing-library/react';
import SkillsYouHave from '.';

const { skillsBlock } = lang.jobs;

describe('SkillsYouHave', () => {
  it('should render correctly for organization', () => {
    const isOrgProfile = true;
    const skillMatched = [{ id: '1', tag: 'React', type: 'skill' }, { id: '2', tag: 'Node', type: 'skill' }];
    const skillNotMatched = ['UI', 'Figma'];
    renderWithTheme(<SkillsYouHave isOrgProfile={isOrgProfile} skillMatched={skillMatched} skillNotMatched={skillNotMatched} />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });
});
