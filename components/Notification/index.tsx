import { formatDateDistance } from 'common/utils/date/dateFormat';
import IconButton from 'components/Icons/IconButton';
import BellIcon from 'components/Icons/Notification';
import NotificationsBox from 'components/NotificationsBox';
import { NotificationContainerProps } from 'components/NotificationsBox/types';
import {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { createPortal } from 'react-dom';
import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import { createNotificationText } from './utils';
import { ButtonContainer, Container, Modal } from './styles';

const Notification = ({ list }: NotificationContainerProps) => {
  const [toggleNotificationBox, setToggleNotificationBox] = useState(false);
  const hasNotification = list?.length > 0;
  const formattedNotifications = useMemo(() => list?.map((data) => {
    const content = data.data;
    const timeStamp = data?.created_at && formatDateDistance(data?.created_at);
    const userName = content?.user?.first_name || content?.upvoter?.first_name;
    const selectedNotificationType = createNotificationText(data.type);
    return {
      id: data.id,
      type: selectedNotificationType,
      userName,
      time: timeStamp,
      entityId: content.entity_id || content.upvotable_id,
      readStatus: !!data.read_at,
      notificationType: data.type,
    };
  }), [list]);

  const toggleNotification = () => {
    setToggleNotificationBox(!toggleNotificationBox);
  };

  const closeNotifications = () => setToggleNotificationBox(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter({
    ref: wrapperRef,
    outSideClick: closeNotifications,
  });

  useEffect(() => {
    if (toggleNotificationBox) document.documentElement.style.overflow = 'hidden';
    else document.documentElement.style.overflow = 'auto';
    return () => { document.documentElement.style.overflow = 'auto'; };
  }, [toggleNotificationBox]);

  return (
    <ButtonContainer hasNotification={hasNotification}>
      <IconButton onClick={toggleNotification} active={toggleNotificationBox}>
        <BellIcon hasNotification={hasNotification} />
      </IconButton>
      {formattedNotifications
      && createPortal(
        <Modal open={toggleNotificationBox}>
          <Container ref={wrapperRef}>
            <NotificationsBox list={formattedNotifications} closeNotifications={closeNotifications} />
          </Container>
        </Modal>,
        document?.body,
      )}
    </ButtonContainer>
  );
};

export default Notification;
