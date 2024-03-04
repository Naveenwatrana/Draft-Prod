import { IconWrapper } from 'components/CardStack/styles';
import FilterIcon from 'components/Icons/FilterIcon';
import { ActionSectionContainer } from './style';

export type ResumeActionBarProps = {
  openFilterPopup: () => void;
};

const ResumeActionBar = ({ openFilterPopup }: ResumeActionBarProps) => {
  return (
    <ActionSectionContainer>
      <IconWrapper
        data-cy="filterResume"
        onClick={openFilterPopup}
      >
        <FilterIcon />
      </IconWrapper>
    </ActionSectionContainer>
  );
};

export default ResumeActionBar;
