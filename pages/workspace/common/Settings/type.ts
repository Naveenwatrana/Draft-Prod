/* eslint-disable @typescript-eslint/naming-convention */
import * as yup from 'yup';
export const schema = yup.object().shape({
  meltwater_rss: yup.string(),
  meltwater_xml: yup.string(),
});

export type IMeltwaterSettingsValues = {
  meltwater_rss: string;
  meltwater_xml: string;
  id?: string;
};

export type MeltwaterProps = {
  data: IMeltwaterSettingsValues;
  currentStep?: string;
};

export type SettingsProps = {
  data: IMeltwaterSettingsValues;
  isUserB2C: boolean;
  draftCompanyUser: boolean;
};

export enum GREENHOUSE_STATE {
  one= 1,
  two= 2,
  three= 3,
}
