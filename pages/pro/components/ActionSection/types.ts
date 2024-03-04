import { Tabs, UserProfile } from 'pages/pro/types';

export type ActionSectionProps = {
    user: any;
    activeTab?: Tabs;
    openFilterPopup: () => void;
    setSkip: () => void;
    currentUser: UserProfile;
    isCurrentUser: boolean;
};

export type FilterPopupProps = {
  onClose: () => void;
  open: boolean;
  filtersToRender : JSX.Element[];
};
