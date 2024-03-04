export type ICompanyData = {
  name: string;
  username: string;
  followingsCount: number;
  followersCount: number;
};
export type CompanyNavbarProps = {
  data: ICompanyData;
  activeTab: number;
};
