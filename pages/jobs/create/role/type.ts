import { IJobRoleValues } from '../types';

export type FindRolePopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type RoleProps = {
  onNext: (data: IJobRoleValues) => void;
  data?: IJobRoleValues;
};
