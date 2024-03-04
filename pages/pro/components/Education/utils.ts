import { IOption } from 'components/MultipleInputTextArea/types';
import { formatDate } from 'common/utils/date/dateFormat';
import { dateFormat } from 'common/constants';
import {
  IAddEducationPayload,
  IEducationFormDescriptionFields,
} from './AddEducation/types';
import { IEducation, IEducationData } from './types';

export const getEducationFormData = (
  data?: IEducation,
): IAddEducationPayload => {
  return data
    ? {
      fieldOfStudy: data.field_of_study,
      institutionName: { value: data.institution_name, label: data.institution_name },
      educationType: data.education_type,
      startDate: data.start_date,
      grade: data.grade || '',
      description: data.description || '',
      endDate: data.end_date || '',
    }
    : {
      institutionName: null,
      educationType: '',
      fieldOfStudy: '',
      startDate: '',
      grade: '',
      description: '',
      endDate: '',
    };
};

export const getEducationDescriptionData = (
  data?: IEducation,
): IEducationFormDescriptionFields => {
  if (data) {
    return {
      skills: data?.tags.map((tagData) => {
        return {
          label: tagData.tag,
          value: `${tagData.id}`,
        };
      }),
      description: data?.description || '',
    };
  } else {
    return {
      skills: [],
      description: '',
    };
  }
};

export const formatEducationPayload = (data: IAddEducationPayload, tags: IOption[], description: string) => {
  const payload: IEducationData = {
    institution_name: data.institutionName?.label || '',
    education_type: data.educationType,
    field_of_study: data.fieldOfStudy,
    start_date: formatDate(data.startDate, dateFormat),
    grade: data.grade,
    description,
    tag_ids: tags.map((tag) => Number(tag.value)),
  };
  if (data.endDate) {
    payload.end_date = formatDate(data.endDate, dateFormat);
  }
  return payload;
};
