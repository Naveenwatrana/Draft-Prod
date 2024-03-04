import { IProfileData } from '../types';

export type ResumeTabProps = {
  closeFilterPopup: () => void;
  openFilter: boolean;
  data: IProfileData;
  ownProfile: boolean;
};

export enum ModalType {
  WORK_EXPERIENCE = 1,
  PROJECT = 2,
  EDUCATION = 3,
}

export type CommonResumeDataType = {
  tags: {
    tag: string
  }[];
};
