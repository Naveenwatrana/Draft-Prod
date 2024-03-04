export type ICompetitor = {
  name: string;
  website: string;
};
export type ICompanyInsights = {
  competitor_list: string;
  id: string;
  name: string;
  username: string,
  followers_count: number,
  followings_count: number,
  list_of_investors: string,
  number_of_funding_rounds: number,
  total_funding_amount: number,
  technologies_used: string;
  list_of_funding_rounds_closed: string;
  last_funding_announcement_date: string;
  last_funding_stage: string;
  type: string;
  company_type: string;
  year_founded: string;
  headcount: string;
  hq_location: string;
  url: string;
  gics_sectors: string;
  gics_industry_groups: string;
  gics_industries: string;
  gics_sub_industries: string;
  insights_fetched: boolean;
  saved?: boolean;
};

export type InsightsJobPageProps = {
  companyInfo: ICompanyInsights;
  isOwnProfile: boolean;
};
export type IFundingRoundClosed = {
  [key: string]: {
    stage: string;
    amount: string;
    date: string;
  };
};
