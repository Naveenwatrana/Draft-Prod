import { formatDate } from 'common/utils/date/dateFormat';
import { dateFormatYMD } from 'common/constants';
import {
  IExperienceData, IExperienceDescriptionValues, IExperiencePayload, IExperienceSummaryValues,
} from './type';

export const formatExperiencePayload = (
  formData: IExperienceDescriptionValues & IExperienceSummaryValues,
) => {
  if (
    formData.functionalRole
    && formData.roleTitle
    && formData.organisationName
    && formData.employmentType
    && formData.location && formData.locationType && formData.roleType
  ) {
    const experienceData: IExperiencePayload = {
      role_id: Number(formData.functionalRole.value),
      role_title: formData.roleTitle,
      company_name: formData.organisationName.label,
      employment_type: formData.employmentType.value,
      location: formData.location.label,
      location_type: formData.locationType.value,
      role_type: formData.roleType.value,
      start_date: formatDate(formData.startDate, dateFormatYMD),
      benefits: formData.benefits,
      tag_ids: formData.skillsAndTechnologiesUsed.map((skill) => Number(skill.value)),
      role_description: formData.roleDescription,
      total_people_managed: formData?.totalPeopleManaged?.value || '',
      company_id: formData.organisationName.value ? Number(formData.organisationName.value) : null,
    };
    if (formData.ongoing) {
      experienceData.ongoing = true;
    } else {
      experienceData.end_date = formatDate(formData.endDate, dateFormatYMD);
    }
    return experienceData;
  }
};

export const getSummaryFormData = (data: IExperienceData) : IExperienceSummaryValues => {
  return {
    roleTitle: data?.role_title,
    organisationName: { label: data?.company_name, value: `${data?.company_id}` },
    functionalRole: data?.role?.name ? { label: data?.role?.name, value: `${data?.role?.id}` } : null,
    location: { label: data?.location, value: data?.location },
    employmentType: { label: data?.employment_type, value: data?.employment_type },
    locationType: { label: data?.location_type, value: data?.location_type },
    roleType: { label: data?.role_type, value: data?.role_type },
    totalPeopleManaged: data?.total_people_managed ? { label: data?.total_people_managed, value: data?.total_people_managed } : null,
    startDate: data?.start_date,
    endDate: data?.end_date,
    ongoing: data?.ongoing,
  };
};

export const getDescriptionFormData = (data: IExperienceData) : IExperienceDescriptionValues => {
  return {
    skillsAndTechnologiesUsed: data?.tags.map((tag) => { return { label: tag.tag, value: tag.id }; }),
    benefits: data?.benefits,
    roleDescription: data?.role_description,
  };
};
