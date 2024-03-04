import { IImage } from 'components/ImageUpload/types';
import { ILoggedInUser } from 'pages/article/view/types';
import { CardsEntity } from 'pages/pro/types';
import { IOption } from 'components/MultipleInputTextArea/types';
import { StatusVal } from 'pages/workspace/type';

export type JobDetailData = {
    background: string,
    description: string,
    jobType: string,
    locationType: string,
    role: { id: string, name: string },
    salaryFrom: number,
    salaryTo: number,
    snapshot: string,
    snapshotBackground: string,
    status: string,
    uuid: string,
    companyId: string | number;
    company?: Company;
    applicants?: any;
    id: string;
    saved: boolean;
    applied: boolean;
    matchingSkills: ITag[];
    skills: ITag[];
    cards?: (CardsEntity)[] | null;
    languages: IOption[];
    requirements: string[];
    responsibilities: string[];
    oteFrom: number;
    oteTo: number;
    roleType: IOption | null;
    range: IOption | null;
    employmentType: IOption | null;
    workStyle: IOption | null;
    location: IOption | null;
    addMore: string[];
    maximumDays?: IOption | null;
    minimumDays?: IOption | null;
    applicantsCount?: number;
    matchedWhoYouAre: string[];
    matchedWhatWillYouDo: string[];
    languageMatched: string[];
    categorySkills: { [key: string]: string[] };
    title?: string;
    officeDaysPerWeekType?: IOption | null;
}
export type ITag = {
    id: string;
    tag: string;
    type: string;
    matched_status?: boolean;
    pivot?: {
      importance_scale?: number;
    },
};
export type JobDetailDataResponse = {
    background?: string,
    description?: string,
    job_type?: string,
    location?: string,
    location_type?: string,
    role?: string,
    salary_from?: number,
    salary_to?: number,
    snapshot?: string,
    snapshot_background?: string,
    status?: string,
    uuid: string,
    company_id: string,
}

export type IJobsImage = IImage & {
    returnKeyName: string;
}

export type IJobsImages = {
    images: IJobsImage[];
}

export type IJobsPictureNames = {
    [key: string]: string;
}
export type JobPageProps = {
    jobData: IJob;
    loggedInUser: ILoggedInUser | null;
    isAuthor?: boolean;
    view?: string;
    slug?: string;
    origin?: string;
};
export interface IJob {
    id: string;
    role: { id: string, name: string };
    location: string;
    job_type: string;
    salary_from: number;
    salary_to: number;
    gross_salary_from: number;
    office_days_to: number;
    office_days_from: number;
    gross_salary_to: number;
    employment_type: string;
    role_type: string;
    total_people_managed: string;
    background: string;
    description: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    location_type: string;
    snapshot: string;
    snapshot_background: string;
    status: StatusVal;
    uuid: string;
    external_ats?: null;
    external_ats_job_id?: null;
    company_id: number;
    applied: boolean;
    company?: Company;
    match_score?: number;
    applicants?: any;
    saved: boolean;
    matching_skills: ITag[];
    skills: ITag[];
    responsibilities: string[];
    requirements: string[];
    languages: ITag[];
    title?: string;
    slug?: string;
    applicants_count: number;
    cards?: (CardsEntity)[] | null;
    matches?: IMatches;
    category_skills: { [key: string]: string[] };
    user_matched_skills_count?: number,
    job_skills_count?: number,
    office_days_per_week?: string,
  }
export type IMatches = {
  base_salary_match?: boolean;
  target_earning?: boolean;
  employment_type?: boolean;
  location_type?: boolean;
  location?: boolean;
  languages?: ITag[];
  role_type?: boolean;
  office_days_per_week?: boolean;
  total_people_managed?: boolean;
};
export interface Company {
    id: number;
    name: string;
    url: string;
    logo: string;
    headcount: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    summary?: null;
    username: string;
    gics_sectors: string;
    gics_industry_groups: string;
    gics_industries: string;
    gics_sub_industries: string;
    number_of_funding_rounds: string;
    last_funding_stage: string;
    list_of_investors: string;
    last_funding_announcement_date: string;
    list_of_funding_rounds_closed: string;
    total_funding_amount: string;
    ceo_name: string;
    competitor_list: string;
    genz_work: string;
    mission_statement: string;
    technologies_used: string;
    usp: string;
    ceo_quote: string;
    purpose: string;
    linkedin_url: string;
    company_tags: string;
    year_founded: string;
    hq_location: string;
    company_type: string;
    ipo_date: string;
    market_capitalization?: null;
    executive_leadership_team?: null;
    learning_opportunities?: null;
    new_challenges?: null;
    type?: null;
    verified_at?: null;
    verification_code?: null;
    work_email?: null;
    saved: boolean;
    followed: boolean;
    mantra?: string;
    organisation_type?: string;
  }

export type JobCardsContainerProps = {
    notAvailable: boolean;
    candidateView: boolean;
};

export type QuickFilterProps = {
    isActive: boolean;
};

export type ApplicationFilter = {
    search?: string;
    isRecommended?: boolean;
    isSortListed?: boolean;
    isApplied?: boolean;
    isMessaged?: boolean;
    skills?: ITag[];
};

export type NavFilterProps = {
    skills: { [key: string]: string[] };
    updateFilter: (filter: ApplicationFilter) => void;
    setSkills: (skills: string[]) => void;
};

export type ApplicantCardContainerProps = {
    shortlisted?: boolean;
};
