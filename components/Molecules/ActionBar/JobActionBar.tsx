import { theme } from 'common/theme';
import { IconWrapper } from 'components/Atoms/IconWrapper';
import TrashIcon from 'components/Icons/TrashIcon';
import ActionBarLogo from 'components/Atoms/ActionBarLogo';
import SaveContent from 'components/Icons/SaveContent';
import ShareProfile from 'components/Atoms/ShareProfile';
import { useNavigate } from 'common/utils/router-fill';
import { useState } from 'react';
import { horizontalPositionValues } from 'components/KebabMenu/types';
import { useLoggedInUser } from 'common/hooks/useLoggedInUser';
import useAladdinInteraction from 'common/services/Aladdin/useAladdinInteraction';
import { IInteractionEventValueType, IInteractionItemTypes, IInteractionTypes } from 'common/services/Aladdin/types';
import { useSaveContent } from 'common/hooks/useSaveContent';
import { loginUrl } from 'common/utils/network/appRouts';
import { PINS_TYPES } from 'common/types';
import AddIcon from 'components/Icons/AddIcon';
import lang from 'common/lang';
import { JobActionBarProps } from './types';
import { Container, SecondaryButton } from './style';

const {
  profile: { addBlock },
} = lang;

const JobActionBar = ({
  isAuthor, children, jobSavedStatus, id, setSkip, isJobOpen,
}: JobActionBarProps) => {
  const navigate = useNavigate();
  const { saveInteraction } = useAladdinInteraction();
  const [saved, setSaved] = useState<boolean>(jobSavedStatus || false);
  const isUserLoggedIn = useLoggedInUser();
  const { saveContent } = useSaveContent();
  const saveJob = async () => {
    setSkip();
    if (!isUserLoggedIn) {
      navigate(loginUrl);
      return;
    }
    // Aladdin interaction event
    saveInteraction({
      itemId: id,
      itemType: IInteractionItemTypes.jobs,
      eventType: IInteractionTypes.Save,
      eventValue: IInteractionEventValueType.brandTab,
    });
    // Aladdin interaction event
    saveContent(id, PINS_TYPES.JOBS, IInteractionItemTypes.jobs);
    setSaved(!saved);
  };
  const renderAddButtonLabel = (label: string) => (
    <>
      <AddIcon variant="small" color={theme.palette.gray[100].value} />
      {label}
    </>
  );
  return (
    <Container>
      {isAuthor && (
        <>
          <SecondaryButton
            label={renderAddButtonLabel(addBlock)}
            onClick={() => {}} // TODO: Add block functionality
          />
          {children}
        </>
      )}
      {!isAuthor && (
        <>
          <IconWrapper data-cy="saveUserProfile" onClick={saveJob}>
            <SaveContent active={saved} />
          </IconWrapper>
          {isJobOpen && <ShareProfile id={id} itemType={IInteractionItemTypes.jobs} primary={false} horizontalPosition={horizontalPositionValues.center} />}
          {children}
        </>
      )}
    </Container>
  );
};

export default JobActionBar;
