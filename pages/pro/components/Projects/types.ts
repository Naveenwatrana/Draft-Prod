import * as yup from 'yup';
import { IProjectPicture } from 'pages/pro/types';
import { maxTitleCharacters, maxCharacters, minTitleCharacters } from 'pages/pro/components/Projects/constant';
import { IOption } from 'components/MultipleInputTextArea/types';

export const schema = yup.object().shape({
  title: yup.string().trim().min(minTitleCharacters, 'min characters required').required('required').max(maxTitleCharacters, 'max word'),
  description: yup.string().max(maxCharacters, 'max word'),
  startDate: yup.string().required(),
  ongoing: yup.boolean(),
  endDate: yup.string().when('ongoing', { is: false, then: yup.string().required() }),
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

export type EditProjectsProps = {
  cancel: () => void;
  save: (formData: IProjectValues) => void;
  values?: IProjectValues;
  isLoading: boolean;
};

export type ProjectDescriptionProps = {
  maxCharacters: number;
  value: string;
  setValue: (e: string) => void;
  noLabel?: boolean;
  placeholder?: string;
  height?: number;
};

export type ProjectTitleProps = {
  value: string;
  setValue: (e: string) => void;
  maxCharacters: number;
};
export type IProjectImages = {
  image_path: string;
  featured: number;
};

export type ICreateProject = {
  project_or_company?: string,
  title?: string,
  ongoing?: number,
  description: string,
  start_date: string,
  media?: IProjectImages[],
  end_date?: string,
  images?: IProjectImages[],
  deleted_images?: IDeletedImagesAPI[],
  tag_ids?: number[],
};
export type IProjectImage = {
  featured: boolean;
  imagePath: string;
  project_id: number;
  id: string;
};
type IProjectImageAPI = {
  featured: boolean;
  project_id: number;
  image_path: string;
  id: string;
};
export type IProjectsPayload = {
  created_at?: string;
  description: string;
  sort?: number;
  end_date?: string;
  featured_project_image?: {
    image_path: string
  };
  project_images?: IProjectImageAPI[],
  id: number;
  ongoing?: boolean;
  project_id?: string;
  project_or_company: string;
  title?: string;
  media?: string[];
  role?: string;
  show_on_timeline: boolean;
  start_date: string;
  sub_project?: string[];
  updated_at: string;
  user_id: number;
  tags: ITagResponse[];
};

export type ITagResponse = {
  id: string,
  tag: string;
  selected?: boolean;
}

export type IDeletedImages = {
  imagePath: string,
  id: string
};
export type IDeletedImagesAPI = {
  id: string,
  image_path: string,
};

export enum ImageField {
  IMAGE = 'image',
  SAVEDIMAGES = 'savedImages'
}
