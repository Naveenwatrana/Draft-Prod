import { ICompanyInsights } from '../types';

export type InsightsDataProps = {
  companyInfo: ICompanyInsights;
};
export type IInvestor = {
  name: string;
};

export type InvestorsProps = {
  data: {
    round: string;
    investors: IInvestor[];
  }[];
};

export type CompetitorsProps = {
  data: IInvestor[];
};
export type IItechnologies = {
  Frameworks: string[],
  Infrastructure: string[],
  Languages: string[],
  Tools: string[],
};
