import LayoutWithNavbar from 'components/LayoutWithNavbar/LayoutWithNavbar';
import React, { useMemo, useState } from 'react';
import NotificationListItem from 'components/NotificationsBox/NotificationListItem';
import lang from 'common/lang';
import { useGetNotificationsQuery } from 'services/NotificationService';
import { formatDateDistance } from 'common/utils/date/dateFormat';
import { createNotificationText } from 'components/Notification/utils';
import TextComp from 'components/textComp';
import NotificationStackIcon from 'components/Icons/NotificationStack';
import NotificationListIcon from 'components/Icons/NotificationList';
import {
  Container, IconContainer, IconsContainer, List, Title,
} from '../style';
import { NotificationType } from '../types';
const { notifications } = lang;

const DesktopNotifications = () => {
  const { data: notificationsData } = useGetNotificationsQuery('1');
  const formattedNotifications = useMemo(
    () => notificationsData?.data?.data?.map((data: any) => {
      const content = data.data;
      const timeStamp = data?.created_at && formatDateDistance(data?.created_at);
      const userName = content?.user?.first_name || content?.upvoter?.first_name;
      const selectedNotificationType = createNotificationText(data.type);
      return {
        id: data.id,
        type: selectedNotificationType,
        userName,
        user: {
          name: content?.user?.name,
          mantra: content?.user?.mantra,
          profile: content?.user?.presigned_profile_cover,
        },
        time: timeStamp,
        entityId: content.entity_id || content.upvotable_id,
        readStatus: !!data.read_at,
        notificationType: data.type,
      };
    }),
    [notificationsData],
  );
  const [active, setActive] = useState<NotificationType>(
    NotificationType.STACK,
  );
  return (
    <LayoutWithNavbar>
      <Container>
        <Title>
          <TextComp component="h3">{notifications.title}</TextComp>
          <IconsContainer>
            <IconContainer
              active={active === NotificationType.STACK}
              onClick={() => setActive(NotificationType.STACK)}
            >
              <NotificationStackIcon />
            </IconContainer>
            <IconContainer
              active={active === NotificationType.LIST}
              onClick={() => setActive(NotificationType.LIST)}
            >
              <NotificationListIcon />
            </IconContainer>
          </IconsContainer>
        </Title>
        <List>
          {formattedNotifications?.map((data: any) => (
            <NotificationListItem
              key={data.id}
              data={data}
              isList={active === NotificationType.LIST}
            />
          ))}
        </List>
      </Container>
    </LayoutWithNavbar>
  );
};

export default DesktopNotifications;
