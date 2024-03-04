import { ISidebarMessage } from 'pages/messages/types';

export type SidebarProps = {
  messages: ISidebarMessage[];
  jobList: ISidebarMessage[];
  view: number;
  activeMessage: boolean;
  onClick: (username: string) => void;
};
