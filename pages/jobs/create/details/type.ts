import { IOption } from 'components/MultipleInputTextArea/types';
import { IJobRoleValues } from '../types';

export type SkillPopupProps = {
  save: (formData: ISkillValues,) => void;
  onClose: () => void;
  data?: ISkillValues | null;
};

export type RoleProps = {
  onNext: () => void;
};

export type ISkillValues = {
  skillsAndTechnologiesUsed: IOption[];
};

export type WhoYouArePopupProps = {
  save: (formData: IWhoYouAreValues,) => void;
  onClose: () => void;
  data?: IWhoYouAreValues | null;
};
export type WhatWillYouDoPopupProps = {
  save: (formData: IWhatWillYouDoValues,) => void;
  onClose: () => void;
  data?: IWhatWillYouDoValues | null;
};

export type IWhoYouAreValues = {
  languages: IOption[];
  requirements: string[];
  employmentType: IOption | null;
  salaryFrom: number,
  salaryTo: number,
  oteFrom: number,
  oteTo: number,
  matched?: string[] | null;
  languageMatched? : string[] | null;
}

export type IWhatWillYouDoValues = {
  roleType: IOption | null;
  range: IOption | null;
  workStyle: IOption | null;
  location: IOption | null;
  officeDaysPerWeekType?: IOption | null;
  minimumDays?: IOption | null;
  maximumDays?: IOption | null;
  addMore: string[];
  matched?: string[] | null;
}

export type DetailsProps = {
  roleData?: IJobRoleValues;
  onNext: (
    data?: IDetailsData,
    id?: number,
  ) => void;
  data?: IDetailsData;
};

export type IDetailsData = {
  whoYouAre: IWhoYouAreValues;
  whatWillYouDo: IWhatWillYouDoValues;
  skills: ISkillValues;
};
