import React from 'react';
import ActionBarLogo from 'components/Atoms/ActionBarLogo';
import { useParams } from 'common/utils/router-fill';
import { ActionSectionPublicProps } from './types';
import { ActionSectionContainer } from './style';
import FollowActions from './FollowActions';

const ActionSectionPublic = ({
  user, setSkip, profileType,
}: ActionSectionPublicProps) => {
  const params = useParams();
  return (
    <ActionSectionContainer>
      <ActionBarLogo />
      <FollowActions
        userSavedStatus={user?.saved}
        id={user?.id}
        followed={user?.followed}
        setSkip={setSkip}
        profileType={profileType}
        username={user?.username || params?.tab?.[0]}
      />

    </ActionSectionContainer>
  );
};

export default ActionSectionPublic;
