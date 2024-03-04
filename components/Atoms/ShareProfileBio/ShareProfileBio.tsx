import lang from 'common/lang';
import KebabMenu from 'components/KebabMenu';
import { ListItem } from 'components/KebabMenu/styles';
import { showNotification } from 'pages/pro/components/Projects/util';
import useAladdinInteraction from 'common/services/Aladdin/useAladdinInteraction';
import { IInteractionEventValueType, IInteractionTypes } from 'common/services/Aladdin/types';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import ShareContent from 'components/Icons/ShareContent';
import { ShareProfileBioProps } from './type';

const { actionBar } = lang;
const ShareProfileBio = ({
  primary = true, id, itemType,
}: ShareProfileBioProps) => {
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
      icon={(
        <ShareContent />
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

export default ShareProfileBio;
