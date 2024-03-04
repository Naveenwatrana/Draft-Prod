import { IOption } from 'components/MultipleInputTextArea/types';
import * as yup from 'yup';
import { MyOptionType } from 'components/Select/types';
import { IEducation } from '../types';

export type AddEducationFormProps = {
  closeForm: () => void;
  data?: IEducation;
};

export type IEducationFormFields = {
  institutionName: MyOptionType | null;
  educationType: string;
  fieldOfStudy: string;
  grade: string;
  startDate: string;
  endDate: string;
  ongoing: boolean;
};
export type SummaryProps = {
  closeForm: () => void;
  handleNext: (data: IAddEducationPayload) => void;
  data: IAddEducationPayload;
  setIsEducationDirty: (isDirty: boolean) => void;
};
const selectSchema = yup.object().shape({
  label: yup.string().required('required'),
  value: yup.string(),
});
export const schema = yup.object().shape({
  institutionName: selectSchema,
  educationType: yup.string().trim().required(),
  fieldOfStudy: yup.string().trim().required(),
  grade: yup.string(),
  startDate: yup.string().required(),
  endDate: yup.string()
    .when('ongoing', { is: false, then: yup.string().required() }),
  ongoing: yup.boolean().required(),
});
export const descriptionSchema = yup.object().shape({
  skills: yup
    .array()
    .min(1)
    .max(20)
    .required(),
  description: yup.string(),
});
export type EducationDescriptionProps = {
  closeForm: () => void;
  handleNext: (data: IEducationFormDescriptionFields) => void;
  onBack: (data: IEducationFormDescriptionFields) => void;
  data?: IEducationFormDescriptionFields;
  onValidate: () => void;
  validated?: boolean;
  isEducationDirty: boolean;
};
export type IAddEducationPayload = {
    institutionName: MyOptionType | null;
    educationType: string;
    fieldOfStudy: string;
    startDate: string;
    grade: string;
    description?: string;
    endDate?: string;
};
export type IEducationFormDescriptionFields = {
  skills: IOption[];
  description: string;

};
