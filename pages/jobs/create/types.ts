import { MyOptionType } from 'components/Select/types';
import { IImage } from 'components/ImageUpload/types';

export type ICreateJobValues = {
    role: string;
    location: MyOptionType;
    locationType: string;
    jobType: string;
    salaryFrom: number | null;
    salaryTo: number | null;
    description: string;
    jobPicture: IImage | null | undefined;
    snapShotPicture: IImage | null | undefined;
    snapshotDescription: string;
    backgroundImage?: string | null;
    snapShotBackground?: string | null;
    deleteJobPicture?: string;
    deleteSnapShotPicture?: string;
};

export type BackButtonProps = {
  onClick: () => void;
};
export type CreateJobFormProps = {
  submit: (values: ICreateJobValues) => void;
  cancel: () => void;
  values: ICreateJobValues;
  totalSteps: number;
  currentStep: number;
  goBack: () => void;
  showStepper: boolean;
  next: (e: number) => void;
  backToEdit: () => void;
  isMobileView?: boolean;
  isEdit?: boolean;
};

export type SelectJobLeverProps = {
  next: (e: number) => void;
};

export type ILocationApi = {
  id: string;
  city: string;
  state: string;
};

export enum CreateJobSteps {
  CREATE_JOB = 1,
  CREATE_JOB_MOBILE = 1.5,
  CREATE_SNAPSHOT = 2,
  CREATE_SNAPSHOT_MOBILE = 2.5,
  REVIEW_JOB = 3,
}
export enum CreateJobLeverSteps {
  SELECT_JOB = 1,
  CREATE_JOB = 2,
  CREATE_JOB_MOBILE = 2.5,
  CREATE_SNAPSHOT = 3,
  CREATE_SNAPSHOT_MOBILE = 3.5,
  REVIEW_JOB = 4,
}

export type ContainerProps = {
  isDesktopView: boolean;
}
export type RightPanelProps = {
  align?: string;
  isDesktopView?: boolean;
}

export type CreateJobProps = {
  isMobileView: boolean;
};

export enum CreateOrgJobSteps {
  ROLE = 1,
  DETAILS = 2,
  BRAND = 3,
}

export type RoleProps = {
  onNext: (values: ICreateJobValues) => void;
  orgData: ICreateJobValues | undefined;
};

export type IJobRoleValues = {
  role: string;
  roleType: MyOptionType | null;
};

export enum JobModalType {
  SKILLS = 1,
  WHO_YOU_ARE = 2,
  WHO_YOU_WILL_DO = 3,
}

export type IJobData = {
  title: string;
  role_id: number;
  tag_ids: number[];
  employment_type: string;
  language_tag_ids: number[];
  role_type: string;
  total_people_managed: string;
  requirements: string[];
  location_type: string;
  location: string;
  office_days_per_week?: string;
  office_days_from: number | string;
  office_days_to: number | string;
  responsibilities: string[];
  company_id: number;
  gross_salary_from?: number;
  gross_salary_to?: number;
  salary_from: number;
  salary_to?: number;
};

export type ICreateJobData = {
  title: string;
  role_id: number;
  tag_ids: {
    tag_id: number,
    importance_scale?: number,
  }[];
  employment_type: string;
  language_tag_ids: number[];
  role_type: string;
  total_people_managed: string;
  requirements: string[];
  location_type: string;
  location: string;
  office_days_per_week?: string;
  office_days_from: number | string;
  office_days_to: number | string;
  responsibilities: string[];
  company_id: number;
  gross_salary_from?: number;
  gross_salary_to?: number;
  salary_from: number;
  salary_to?: number;
};

export type JobCoverCardFelids = {
  companyName: string;
  role: string;
  location: string;
  locationType: string;
  employmentType: string;
  salaryFrom: number;
  salaryTo: number;
  icon: string;
  cover: string;
  id: number;
  title: string;
}
