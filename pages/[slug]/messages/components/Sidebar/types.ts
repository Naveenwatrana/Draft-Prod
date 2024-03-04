import { ISidebarMessage } from 'pages/messages/types';

export type SidebarProps = {
  messages: ISidebarMessage[];
  onClick: (username: string, uuid?:string) => void;
};
