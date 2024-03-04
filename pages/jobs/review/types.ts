import { ICreateJobValues } from '../create/types';
import { useAddJobMutation } from '../jobsService';

type AddJob = ReturnType<typeof useAddJobMutation>[0];

export type ReviewJobProps = {
  back: () => void;
  values: ICreateJobValues;
  isEdit? : boolean;
};

export type IKeyValue = {
  [key: string]: string;
}

export type IAddJobApiCall = (
  values: ICreateJobValues,
  addJobAPI: AddJob,
  jobsImagesPath: IKeyValue[],
  companyId: string,
) => Promise<boolean | any>;

export type IEditJobPayload = (
  values: ICreateJobValues,
  jobsImagesPath: IKeyValue[],
  companyId: string,
) => void;
