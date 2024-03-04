import { ICompany } from 'pages/company/types';

export type UserMenuProps = {
  onLogout: () => void;
  onSwitch: (company: ICompany) => Promise<void>;
  show: boolean;
  toggleShow: (show: boolean) => void;
};
