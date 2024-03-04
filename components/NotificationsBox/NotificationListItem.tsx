import { theme } from 'common/theme';
import Link from 'next/link';
import { useUpdateNotificationMutation } from 'services/NotificationService';
import { COMMENTS_NOTIFICATION } from 'components/Notification/utils';
import DefaultCard from 'components/DefaultCard';
import { ListItem, NotificationText, NotificationTime } from './styles';
import { NotificationListItemProps } from './types';

const NotificationListItem = ({ data, isList = true, onClose }: NotificationListItemProps) => {
  const [updateNotificationApi] = useUpdateNotificationMutation();
  const link = data?.notificationType === COMMENTS_NOTIFICATION ? '?comments=true' : '';
  return (
    <Link
      href={`${data?.type?.link}${data.entityId}${link}`}
      onClick={() => {
        if (onClose) onClose();
        updateNotificationApi(data.id);
      }}
    >
      <ListItem>
        <span>
          <div>
            <NotificationText>
              <span>
                {data.userName}
                {' '}
              </span>
              {data.type.text}
            </NotificationText>
            <NotificationTime>{data.time}</NotificationTime>
          </div>
          {!data.readStatus && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="6" fill={theme.palette.green[100].value} />
            </svg>
          )}
        </span>
        {!isList && (data.user?.name || data.userName) && (
          <DefaultCard
            key={1}
            primaryText={data.user?.name || data.userName}
            secondaryText={data.user?.mantra}
            type="info"
            onClick={() => undefined}
            hideHeader
            cover={data.user?.profile}
          />
        )}
      </ListItem>
    </Link>

  );
};

export default NotificationListItem;
