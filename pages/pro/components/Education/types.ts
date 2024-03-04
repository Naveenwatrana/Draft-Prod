export type IEducation = {
  created_at: string;
  description: null | string;
  education_type: string;
  end_date: null | string;
  field_of_study: string;
  grade: null | string;
  id: number;
  institution_name: string;
  start_date: string;
  updated_at: string;
  user_id: number;
  ongoing: boolean;
  tags: ITag[];
};

export type IEducationData = {
  description: null | string;
  education_type: string;
  end_date?: null | string;
  field_of_study: string;
  grade: null | string;
  institution_name: string;
  start_date: string;
  tag_ids?: number[];
}

export type ITag = {
  id: number;
  tag: string;
  selected?: boolean;
};

export type EducationProps = {
  data: IEducation[];
  onAdd: () => void;
  isEmpty: boolean;
  ownProfile: boolean;
  update?: (id: boolean) => void;
  onEdit?: (id: number) => void;
};

export type SkillTagsProps = {
  tags: ITag[];
};
