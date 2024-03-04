import { ISidebarMessage } from 'pages/messages/types';

export type UserMessageContainerProps = {
  active?: boolean;
};

export type UserMessageProps = {
  message: ISidebarMessage;
  onClick: (username: string, uuid?: string) => void;
};
