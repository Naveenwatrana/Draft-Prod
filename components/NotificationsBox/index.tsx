import lang from 'common/lang';
import { useNavigate } from 'common/utils/router-fill';
import {
  AllNotificationsButton,
  Container, Heading, List, Title,
} from './styles';
import { NotificationBoxProps } from './types';
import NotificationListItem from './NotificationListItem';

const { notifications } = lang;

const NotificationsBox = ({ list, closeNotifications }: NotificationBoxProps) => {
  const navigate = useNavigate();
  return (
    <Container>
      <Title>
        <Heading>{notifications.title}</Heading>
      </Title>
      <List>
        {list?.map((data) => <NotificationListItem key={data.id} data={data} onClose={closeNotifications} />)}
      </List>
      <AllNotificationsButton variant="link" onClick={() => navigate('/notifications')} label={notifications.allNotifications} />
    </Container>
  );
};

export default NotificationsBox;
