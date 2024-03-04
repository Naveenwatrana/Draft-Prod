import { getUniqueValuesFromTwoArrays } from 'common/utils/uniqueValuesFromArray';
import { IMatches, ITag } from './types';
import { ICloseJobModalValues, ICloseModalData } from '../components/Modal/types';

export const getSkillsNotMatched = (matchingSkills: ITag[] | undefined, allSkills: ITag[] | undefined) => {
  if (matchingSkills && allSkills) {
    const skills = allSkills.map((skill) => skill.tag);
    const matchedSkillsTags = matchingSkills.map((skill) => skill.tag);
    return getUniqueValuesFromTwoArrays(matchedSkillsTags, skills);
  }
  return [];
};

export const formatCloseJobPayload = (values: ICloseJobModalValues) => {
  const payloadToReturn: ICloseModalData = { hired: values.hiredForThisRole };
  if (typeof values.foundCandidateOnDraft === 'boolean') payloadToReturn.found_candidate_on_the_draft = values.foundCandidateOnDraft;
  if (values.candidateName) {
    payloadToReturn.candidate_name = values.candidateName.label;
    payloadToReturn.candidate_user_id = Number(values.candidateName.value);
  }
  return payloadToReturn;
};

export const mapMatchingFields = (mapper: Record<string, string>, matches?: IMatches): string[] => {
  if (!matches) return [];
  const fields = Object.keys(matches).reduce((data, key) => {
    const field = mapper[key as keyof IMatches];
    if (field && matches[key as keyof IMatches]) {
      data.push(field);
    }
    return data;
  }, [] as string[]);

  return fields;
};

export const whoYouAreFieldsMap: { [key in keyof IMatches]: string } = {
  base_salary_match: 'salaryFrom',
  target_earning: 'oteFrom',
  employment_type: 'employmentType',
};

export const whatWillYouDoFieldsMap: { [key in keyof IMatches]: string } = {
  location_type: 'workStyle',
  location: 'location',
  role_type: 'roleType',
  office_days_per_week: 'maximumDays',
  total_people_managed: 'range',
};

export const cleanObject = (obj: Record<string, any>): Record<string, any> => {
  const cleanedObject: Record<string, any> = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (value !== undefined && value !== null) {
      cleanedObject[key] = value;
    }
  });

  return cleanedObject;
};
