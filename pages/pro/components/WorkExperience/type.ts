import { MyOptionType } from 'components/Select/types';
import * as yup from 'yup';
import { IOption } from 'components/MultipleInputTextArea/types';
import {
  maxDescriptionCharacters,
  maxRoleTitleCharacters,
  minTitleCharacters,
} from '../Projects/constant';
import { ITagResponse } from '../Projects/types';
import { ISideProjectData } from '../Projects/SideProject/Edit/types';

const selectSchema = yup.object().shape({
  label: yup.string().required('required'),
  value: yup.string().required('required'),
});
const selectNotRequiredSchema = yup.object().shape({
  label: yup.string(),
  value: yup.string(),
});

export const summarySchema = yup.object().shape({
  roleTitle: yup
    .string()
    .trim()
    .min(minTitleCharacters, 'min characters required')
    .required('required')
    .max(maxRoleTitleCharacters, 'max word'),
  functionalRole: selectSchema,
  organisationName: yup.object().shape({
    label: yup.string().required('required'),
    value: yup.string(),
  }),
  employmentType: selectSchema,
  location: selectSchema,
  locationType: selectSchema,
  roleType: selectSchema,
  totalPeopleManaged: selectNotRequiredSchema.nullable(),
  startDate: yup.string().required(),
  ongoing: yup.boolean(),
  endDate: yup
    .string()
    .when('ongoing', { is: false, then: yup.string().required() }),
});
export const descriptionSchema = yup.object().shape({
  skillsAndTechnologiesUsed: yup
    .array()
    .min(1)
    .max(20)
    .required(),
  benefits: yup.string().trim().max(maxDescriptionCharacters, 'max word'),
  roleDescription: yup
    .string()
    .trim()
    .max(maxDescriptionCharacters, 'max word').nullable(),
});

export type IExperienceSummaryValues = {
  roleTitle: string;
  organisationName: MyOptionType | null;
  functionalRole: MyOptionType | null;
  location: MyOptionType | null;
  employmentType: MyOptionType | null;
  locationType: MyOptionType | null;
  roleType: MyOptionType | null;
  totalPeopleManaged?: MyOptionType | null;
  startDate: string;
  endDate: string;
  ongoing: boolean;
};
export type IExperienceDescriptionValues = {
  benefits: string;
  roleDescription: string;
  skillsAndTechnologiesUsed: IOption[];
};

export enum FormSteps {
  SUMMARY = 1,
  DESCRIPTION = 2,
}

export type IExperiencePayload = {
  role_id: number;
  role_title: string;
  company_name: string;
  company_id?: number | null;
  employment_type: string;
  location: string;
  location_type: string;
  role_type: string;
  total_people_managed?: string | null;
  start_date: string;
  end_date?: string;
  benefits: string;
  tag_ids: number[];
  role_description: string;
  ongoing?: boolean;
};

export type DescriptionProps = {
  save: (formData: IExperienceDescriptionValues) => void;
  cancelEdit: () => void;
  onValidate: () => void;
  handleBack: (data: IExperienceDescriptionValues) => void;
  data?: IExperienceDescriptionValues | null;
  validated?: boolean;
  isExperienceDirty: boolean,
};

export type IExperienceData = {
  category: { id: number; name: string };
  role: { id: number; name: string };
  role_id: number;
  company: { logo: string, username?: string };
  company_id: number;
  company_name: string;
  employment_type: string;
  end_date: string;
  id: number;
  location: string;
  location_type: string;
  ongoing: boolean;
  role_description: string;
  role_title: string;
  role_type: string;
  start_date: string;
  total_people_managed: string;
  projects?: ISideProjectData[];
  benefits: string;
  tags: ITagResponse[];
};

export type ExperienceProps = {
  data: IExperienceData;
  onDelete: () => void;
  onEdit: () => void;
  onRefetch?: () => void;
  ownProfile: boolean;
};

export type HeaderProps = {
  logo: string;
  username?: string;
  role: string;
  companyName: string;
  category: string;
  startDate: string;
  endDate?: string;
  location: string;
};

export type ContentProps = {
  employmentType: string;
  locationType: string;
  roleType: string;
  peopleManaged: string;
  roleDescription: string;
  benefits?: string;
  skillsAndTechnologiesUsed: IOption[];
};

export type WorkExperienceProps = {
  onAdd: () => void;
  data: IExperienceData[];
  onEdit: (data: IExperienceData) => void;
  isEmpty: boolean;
  ownProfile: boolean;
  onRefetch?: () => void;
};

export type SkillTagProps = {
  selected?: boolean;
};

export type DeleteType = {
  title: string;
  description1: string;
  description2: string;
  cancelButton: string;
  submitButton: string;
};
