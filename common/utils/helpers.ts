/* eslint-disable camelcase */
import lang from 'common/lang';
import { CREATE_CARD_WIZARD_TYPE } from 'common/types';
import { ICommentDataResponse } from 'components/Comments/types';
import { ICreateCompanyResponse } from 'pages/company/create/types';
import { IFeedData } from 'pages/feed/types';
import { IJob, JobDetailData } from 'pages/jobs/details/types';
import { mapMatchingFields, whoYouAreFieldsMap, whatWillYouDoFieldsMap } from 'pages/jobs/details/utils';
import { IExperienceData } from 'pages/pro/components/WorkExperience/type';
import { items } from 'pages/workspace/common/Feed/const';
import {
  IApplicationResponseData, ICronycleFeedArticleResponse, ICronycleFeedResponse, IJobResponseData, IMeltwaterFeedArticle,
} from 'pages/workspace/type';
import { FieldValues } from 'react-hook-form';

const {
  cards: { meta },
} = lang;

const camelToSnakeCase = (propertyName: string) => propertyName
  .replace(
    /[A-Z]/g,
    (letter) => `_${letter.toLowerCase()}`,
  );

export const trimLine = (paragraph: string) => paragraph.replace(/(^[ \t]*\n)/gm, '');

const snakeToCamelCase = (propertyName: string) => propertyName
  .toLowerCase()
  .replace(/([-_][a-z])/g, (group) => group
    .toUpperCase()
    .replace('-', '')
    .replace('_', ''));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseObjectPropertiesToSnakeCase = (object: any): any => {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        return [camelToSnakeCase(key), value];
      }
      const parsedNestedObject = parseObjectPropertiesToSnakeCase(value);
      return [camelToSnakeCase(key), parsedNestedObject];
    }),
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseObjectPropertiesToCamelCase = (object: any): any => {
  if (!object) {
    return;
  }
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => {
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        return [snakeToCamelCase(key), value];
      }
      const parsedNestedObject = parseObjectPropertiesToCamelCase(value);
      return [snakeToCamelCase(key), parsedNestedObject];
    }),
  );
};

export const formateBioData = (data: any) => {
  const {
    data: {
      mantra: userMantra,
      first_name: userFirstName,
      last_name: userLastName,
      profile_cover: userProfileCover,
      presigned_profile_cover: presignedProfileCover = '',
      onboarding_step: onboardingStep,
    },
  } = data;
  return {
    userMantra,
    userFirstName,
    userLastName,
    userProfileCover,
    presignedProfileCover,
    onboardingStep,
  };
};

export const formatNumberToCurrency = (number: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  return formatter.format(number).replace('.00', '');
};

export const formateJobDetailData = (data: IJob): JobDetailData => {
  const {
    title,
    background = '',
    description = '',
    job_type: jobType = '',
    location = '',
    location_type: locationType = '',
    role,
    salary_from: salaryFrom = 0,
    salary_to: salaryTo = 0,
    snapshot = '',
    snapshot_background: snapshotBackground = '',
    status = '',
    company_id: companyId = '',
    uuid,
    id,
    saved,
    applied,
    matching_skills,
    skills,
    cards,
    gross_salary_from,
    office_days_to,
    office_days_from,
    gross_salary_to,
    employment_type,
    role_type,
    total_people_managed,
    responsibilities,
    requirements,
    languages,
    applicants,
    applicants_count,
    matches,
    category_skills,
    office_days_per_week,
  } = data;
  return {
    title,
    background,
    description,
    jobType,
    location: { value: location, label: location },
    locationType,
    role,
    salaryFrom,
    salaryTo,
    snapshot,
    snapshotBackground,
    status,
    uuid,
    companyId,
    id,
    applied,
    matchingSkills: matching_skills || [],
    saved: saved || false,
    skills,
    cards,
    languages: languages.map((tag) => { return { label: tag.tag, value: tag.id }; }),
    requirements,
    responsibilities,
    oteFrom: gross_salary_from,
    oteTo: gross_salary_to,
    range: { value: total_people_managed, label: total_people_managed },
    employmentType: { value: employment_type, label: employment_type },
    maximumDays: office_days_to ? { value: `${office_days_to}`, label: `${office_days_to}` } : null,
    minimumDays: office_days_from ? { value: `${office_days_from}`, label: `${office_days_from}` } : null,
    addMore: responsibilities,
    roleType: { value: role_type, label: role_type },
    workStyle: { value: locationType, label: locationType },
    applicants,
    applicantsCount: applicants_count,
    matchedWhoYouAre: mapMatchingFields(whoYouAreFieldsMap, matches),
    matchedWhatWillYouDo: mapMatchingFields(whatWillYouDoFieldsMap, matches),
    categorySkills: category_skills,
    languageMatched: (matches?.languages || [])?.filter((language) => language.matched_status).map((language) => language.tag),
    officeDaysPerWeekType: { value: office_days_per_week || '', label: office_days_per_week || '' },
  };
};

export const formateJobListData = ({
  data, current_page: currentPage, total, from, to,
}: IJobResponseData) => {
  const jobsListData = data.map(
    ({
      id,
      role,
      location,
      job_type: jobType,
      salary_from: salaryFrom,
      salary_to: salaryTo,
      background,
      description,
      userId,
      created_at: createdAt,
      updated_at: updatedAt,
      location_type: locationType,
      snapshot,
      snapshot_background: snapshotBackground,
      status,
      uuid,
      applicants_count: applicantsCount,
      company_id: companyId = '',
      matchingSkills: matching_skills,
      slug,
    }) => {
      return {
        id,
        role,
        location,
        jobType,
        salaryFrom,
        salaryTo,
        background,
        description,
        userId,
        createdAt,
        updatedAt,
        locationType,
        snapshot,
        snapshotBackground,
        status,
        uuid,
        applicantsCount,
        companyId,
        matching_skills,
        slug,
      };
    },
  );
  return {
    jobsListData, currentPage, total, from, to,
  };
};

export const formateApplicationListData = ({
  data, current_page: currentPage, total, from, to,
}: IApplicationResponseData) => {
  const applicationListData = data.map(
    (
      {
        job: {
          id,
          role,
          location,
          job_type: jobType,
          salary_from: salaryFrom,
          salary_to: salaryTo,
          background,
          description,
          userId,
          created_at: createdAt,
          updated_at: updatedAt,
          location_type: locationType,
          snapshot,
          snapshot_background: snapshotBackground,
          status,
          uuid,
          applicants_count: applicantsCount,
          company_id: companyId = '',
          slug,
        },
      },
    ) => {
      return {
        id,
        role,
        location,
        jobType,
        salaryFrom,
        salaryTo,
        background,
        description,
        userId,
        createdAt,
        updatedAt,
        locationType,
        snapshot,
        snapshotBackground,
        status,
        uuid,
        applicantsCount,
        companyId,
        slug,
      };
    },
  );
  return {
    applicationListData, currentPage, total, from, to,
  };
};
export const formatCronycleFeedData = (data: ICronycleFeedResponse) => {
  const {
    created_at: createdAt,
    cronycle_feed_id: cronycleFeedId,
    id,
    is_connected: isConnected,
    name,
    owner,
    updated_at: updatedAt,
    user_id: userId,
  } = data;
  return {
    createdAt,
    cronycleFeedId,
    id,
    isConnected,
    name,
    owner,
    updatedAt,
    userId,
  };
};

export const formatCronycleFeedArticleData = (data: ICronycleFeedArticleResponse) => {
  const {
    id,
    title: header,
    published_date,
    url,
    created_at,
    image_urls,
    author,
    domain,
  } = data;
  return {
    id,
    header,
    date: new Date(published_date),
    status: true,
    fetchDate: new Date(created_at),
    image: JSON.parse(image_urls)?.[0],
    url,
    author,
    domain,
  };
};

export const formatMeltwaterFeedArticleData = (data: IFeedData): IMeltwaterFeedArticle => {
  const {
    id,
    title: header,
    published_date,
    url,
    created_at,
    image_urls,
    author,
    domain,
    meltwater_type,
    meltwater_source_name,
  } = data;
  const dataToReturn: IMeltwaterFeedArticle = {
    id: Number(id),
    header: header || '',
    status: true,
    image: image_urls && JSON.parse(image_urls)?.[0],
    url,
    author: meltwater_source_name || author || '',
    domain: domain || '',
    meltwater_type: items.find((item) => item.value === meltwater_type)?.label || meltwater_type,
  };
  if (published_date) dataToReturn.date = new Date(published_date);
  if (created_at) dataToReturn.fetchDate = new Date(created_at);
  return dataToReturn;
};

export const formatCommentsData = (data: ICommentDataResponse) => {
  const {
    id,
    comment,
    user_id: userId,
    created_at,
    updated_at,
    commenter,
  } = data;
  return {
    id,
    comment,
    userId,
    createdAt: new Date(created_at),
    updatedAt: new Date(updated_at),
    commenter,
  };
};

export const formatCompanyProfile = (data: ICreateCompanyResponse) => {
  const {
    created_at,
    headcount,
    id,
    tags,
    logo,
    name,
    updated_at,
    url,
    user_id,
    username,
  } = data;
  return {
    created_at,
    headcount,
    id,
    logo,
    industries: tags,
    name,
    updated_at,
    url,
    user_id,
    username,
  };
};

export const formatSelectOptions = (data: { id: number; name: string; }[]) => data?.map(
  (option: { id: number; name: string }) => {
    return { value: `${option?.id}`, label: option?.name };
  },
);

export const formatExperienceSelectOptions = (data: IExperienceData[]) => data?.map(
  (option: IExperienceData) => {
    return { value: `${option?.id}`, label: `${option?.role_title} at ${option.company_name}`, tags: option.tags };
  },
);

export const isFormFilled = (values: FieldValues) => {
  return Object.values(values).some((value) => {
    if (typeof value?.length === 'number') return value?.length;
    return !!value;
  });
};

export const metaDescriptionMatch = (cardWizardType: CREATE_CARD_WIZARD_TYPE) => meta[cardWizardType];

export function reorderArrayByIndex<T>(data: T[], index: number[]): T[] {
  return data.map((element, i) => data[index[i]]);
}
