import lang from 'common/lang';
import GreenShareIcon from 'components/Atoms/GreenShareIcon';
import KebabMenu from 'components/KebabMenu';
import { ListItem } from 'components/KebabMenu/styles';
import { showNotification } from 'pages/pro/components/Projects/util';
import useAladdinInteraction from 'common/services/Aladdin/useAladdinInteraction';
import { IInteractionEventValueType, IInteractionTypes } from 'common/services/Aladdin/types';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import { ShareProfileProps } from './types';

const { actionBar } = lang;
const ShareProfile = ({
  primary = true, horizontalPosition, id, itemType,
}: ShareProfileProps) => {
  const { saveInteraction } = useAladdinInteraction();
  const copyProfileLink = () => {
    // Aladdin interaction event
    saveInteraction({
      itemId: id,
      itemType,
      eventType: IInteractionTypes.share,
      eventValue: IInteractionEventValueType.brandTab,
    });
    // Aladdin interaction event
    navigator.clipboard.writeText(window.location.href);
    showNotification('Link Copied', NotificationType.SUCCESS);
  };

  return (
    <KebabMenu
      position="top"
      horizontalPosition={horizontalPosition}
      icon={(
        <GreenShareIcon primary={primary} />
      )}
      list={(
        <ListItem
          onClick={copyProfileLink}
          data-cy="copyProfileLink"
        >
          {actionBar.copyLink}
        </ListItem>
      )}
    />

  );
};

export default ShareProfile;
