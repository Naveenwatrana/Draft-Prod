import { ICreateCompanyFormsValues } from 'pages/company/types';

export const initialCompanyValues: ICreateCompanyFormsValues = {
  headcount: { value: '', label: '' },
  industries: [],
  summary: '',
  logoImage: undefined,
  companyName: '',
};

export const headcountOptions = [
  { value: '1-10', label: '1-10' },
  { value: '11-50', label: '11-50' },
  { value: '51-200', label: '51-200' },
  { value: '201-500', label: '201-500' },
  { value: '501-1000', label: '501-1000' },
  { value: '1001-5000', label: '1,001-5,000' },
  { value: '5001-10000', label: '5,001-10,000' },
  { value: '10000+', label: '10,000+' },
];
