import {
  ISkillValues,
  IWhatWillYouDoValues,
  IWhoYouAreValues,
} from './details/type';
import { ICreateJobData, IJobRoleValues } from './types';

export const formatIJobDataPayload = (
  companyId: number,
  roleData: IJobRoleValues,
  skills: ISkillValues,
  whoYouAre: IWhoYouAreValues,
  whatWillYouDo: IWhatWillYouDoValues,
): ICreateJobData => {
  const jobDataToReturn: ICreateJobData = {
    title: roleData?.role || '',
    role_id: Number(roleData?.roleType?.value),
    tag_ids: skills.skillsAndTechnologiesUsed.map((skill) => { return { tag_id: Number(skill.value), importance_scale: skill.importanceScale }; }),
    employment_type: whoYouAre.employmentType?.label || '',
    language_tag_ids: whoYouAre.languages?.map((language) => Number(language.value)),
    role_type: whatWillYouDo.roleType?.value || '',
    total_people_managed: whatWillYouDo.range?.value || '',
    requirements: whoYouAre.requirements,
    location_type: whatWillYouDo.workStyle?.value || '',
    location: whatWillYouDo.location?.label || '',
    office_days_from: Number(whatWillYouDo.minimumDays?.value) || '',
    office_days_to: Number(whatWillYouDo.maximumDays?.value) || '',
    responsibilities: whatWillYouDo.addMore,
    company_id: companyId,
    salary_from: whoYouAre.salaryFrom,
  };
  if (whatWillYouDo.officeDaysPerWeekType?.value) {
    jobDataToReturn.office_days_per_week = whatWillYouDo.officeDaysPerWeekType.value;
  }
  if (whoYouAre?.oteFrom) {
    jobDataToReturn.gross_salary_from = whoYouAre.oteFrom;
  }
  if (whoYouAre?.oteTo) {
    jobDataToReturn.gross_salary_to = whoYouAre.oteTo;
  }
  if (whoYouAre?.salaryTo) {
    jobDataToReturn.salary_to = whoYouAre.salaryTo;
  }
  return jobDataToReturn;
};
