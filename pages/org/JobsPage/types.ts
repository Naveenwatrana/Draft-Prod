export type CompanyJobPageProps = {
  companyInfo: ICompanyInfo;
  isOwnProfile: boolean;
};
export interface ICompanyInfo {
  jobs?: (JobsEntity)[] | null;
  followers_count: number;
  followings_count: number;
  name: string;
  location: string;
  username: string;
  id: string;
}
export interface JobsEntity {
  id: number;
  role: string;
  location: string;
  job_type: string;
  salary_from: number;
  salary_to: number;
  background?: null;
  description?: null;
  user_id: number;
  created_at: string;
  updated_at: string;
  location_type: string;
  snapshot: string;
  snapshot_background?: null;
  status: string;
  uuid: string;
  external_ats?: null;
  external_ats_job_id?: null;
  company_id: number;
  applied: boolean;
}
