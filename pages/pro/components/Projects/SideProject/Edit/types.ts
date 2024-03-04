import * as yup from 'yup';
import {
  maxTitleCharacters,
  maxCharacters,
  minTitleCharacters,
  maxRoleTitleCharacters,
  maxDescriptionCharacters,
} from 'pages/pro/components/Projects/constant';
import { IOption } from 'components/MultipleInputTextArea/types';
import { IProjectPicture } from 'pages/pro/types';
import { ITagResponse } from '../../types';

export const schema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .min(minTitleCharacters, 'min characters required')
    .required('required')
    .max(maxTitleCharacters, 'max word'),
  description: yup.string().max(maxCharacters, 'max word'),
  startDate: yup.string().required(),
  ongoing: yup.boolean(),
  endDate: yup
    .string()
    .when('ongoing', { is: false, then: yup.string().required() }),
  skills: yup.array().min(1).max(10).required(),
});

export type IProjectValues = {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  ongoing: boolean;
  skills: IOption[];
  id?: number;
  image?: IProjectPicture[];
  savedImages?: IProjectImage[] | undefined;
  deletedImages?: IDeletedImages[] | undefined;
};

export type IProjectImage = {
  featured: boolean;
  imagePath: string;
  project_id: number;
  id: string;
};

export type IDeletedImages = {
  imagePath: string;
  id: string;
};

export enum FormSteps {
  SUMMARY = 1,
  DESCRIPTION = 2,
}

const selectNotRequiredSchema = yup.object().shape({
  label: yup.string(),
  value: yup.string(),
});

export const summarySchema = yup.object().shape({
  projectName: yup
    .string()
    .trim()
    .min(minTitleCharacters, 'min characters required')
    .required('required')
    .max(maxRoleTitleCharacters, 'max word'),
  role: yup
    .string()
    .trim()
    .notRequired()
    .max(maxTitleCharacters, 'max word'),
  associatedWith: selectNotRequiredSchema,
  startDate: yup.string().required(),
  ongoing: yup.boolean(),
  endDate: yup
    .string()
    .when('ongoing', { is: false, then: yup.string().required() }),
});

export type ISummaryProjectValues = {
  projectName: string;
  role: string;
  startDate: string;
  endDate: string;
  ongoing: boolean;
  associated?: boolean;
  associatedWith?: (IOption & { tags: ITagResponse[] });
};

export type SummaryProps = {
  save: (formData: ISummaryProjectValues) => void;
  cancelEdit: () => void;
  data?: ISummaryProjectValues;
  validated: boolean;
  setIsProjectDirty: React.Dispatch<React.SetStateAction<boolean>>;
};

export const descriptionSchema = yup.object().shape({
  skillsAndTechnologiesUsed: yup
    .array()
    .min(1)
    .max(20)
    .required(),
  description: yup.string().trim().max(maxDescriptionCharacters, 'max word'),
});

export type DescriptionProps = {
  save: (formData: IDescriptionProjectValues) => void;
  cancelEdit: () => void;
  onBack: (data: IDescriptionProjectValues) => void;
  data?: IDescriptionProjectValues;
  onValidate: () => void;
  validated?: boolean;
  isProjectDirty?: boolean;
};

export type IDescriptionProjectValues = {
  image?: IProjectPicture[];
  savedImages?: IProjectImage[] | undefined;
  deletedImages?: IDeletedImages[] | undefined;
  description?: string;
  skillsAndTechnologiesUsed?: IOption[];
  providedSkillsAndTechnologiesUsed?: IOption & { tags: ITagResponse[] };
};

export type ISideProjectPayload = {
  name: string;
  start_date: string;
  end_date?: string;
  ongoing: boolean;
  tag_ids: number[];
  description?: string;
  role?: string;
  experience_id?: number;
  media?: { url: string }[];
};

export type ISideProjectData = {
  id: string;
  name: string;
  start_date: string;
  end_date?: string;
  ongoing: boolean;
  tags: ITagResponse[];
  description?: string;
  role?: string;
  experience_id?: number;
  project_media?: { url: string; project_id: number; id: string;} [];
};
