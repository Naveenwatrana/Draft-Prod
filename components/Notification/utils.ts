/* eslint-disable @typescript-eslint/naming-convention */
import lang from 'common/lang';

export const COMMENTS_NOTIFICATION = 'App\\Notifications\\CommentNotification';

const { commentsNotification, upvoteNotification } = lang.notifications;
export const NotificationMessages = {
  [COMMENTS_NOTIFICATION]: {
    text: commentsNotification,
    link: '/article/view/',
  },
  'App\\Notifications\\UpvoteNotification': {
    text: upvoteNotification,
    link: '/article/view/',
  },
};

export const createNotificationText = (type: string) => {
  const message = NotificationMessages[type as keyof typeof NotificationMessages];
  return message;
};
