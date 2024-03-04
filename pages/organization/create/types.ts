import lang from 'common/lang';
import { IOption } from 'components/MultipleInputTextArea/types';
import { validURLRegex } from 'pages/company/create/schema';
import { minRoleTitleCharacters, maxRoleTitleCharacters, maxCodeChar } from 'pages/pro/components/Projects/constant';
import * as yup from 'yup';

const {
  company: { companyUrlError, validUrlError },
} = lang;

export enum CreateOrganizationSteps {
  SPLASH_SCREEN = 0,
  WEBSITE = 1,
  ORG_DETAILS = 2,
  CONFIRM_EMAIL = 3,
  BRAND_STACK = 4,
}

export type NavbarProps = {
  step: number;
  onBack: (step: number) => void;
};

export const websiteDetailsSchema = yup.object().shape({
  organizationURL: yup
    .string()
    .matches(new RegExp(validURLRegex), validUrlError)
    .max(maxRoleTitleCharacters, 'max word')
    .required(companyUrlError),
});

export const orgDetailsSchema = yup.object().shape({
  organizationName: yup
    .string()
    .trim()
    .required('required')
    .min(minRoleTitleCharacters, 'min word')
    .max(maxRoleTitleCharacters, 'max word'),
  orgType: yup.object().shape({
    label: yup.string().required('required'),
    value: yup.string().required('required'),
  }),
  companyType: yup.object().shape({
    label: yup.string(),
    value: yup.string(),
  }),
});

export type IOrganizationValues = {
  userName:string;
  organizationName: string;
  orgType: IOption;
  companyType?: IOption;
  organizationURL: string;
};

export type IConfirmEmailValues = {
  workEmail: string;
  confirmEmailMessage: boolean;
  otp: string;
};

export type WebsiteProps = {
  onNext: (values: IOrganizationValues) => void;
  orgData: IOrganizationValues | undefined;
};

export type OrgDetailsProps = {
  onNext: (values: IOrganizationValues) => void;
  orgData: IOrganizationValues | undefined;
};

export type ConfirmEmailProps = {
  orgData: IOrganizationValues;
  onNext: () => void
};

export const confirmEmailSchema = yup
  .object()
  .shape({
    workEmail: yup
      .string().email().required('required'),
    confirmEmailMessage: yup.bool().oneOf([true], 'Required'),
  })
  .required('required');

export const confirmOtpSchema = yup
  .object()
  .shape({
    otp: yup.string()
      .max(maxCodeChar, 'max word')
      .required('required'),
  })
  .required('required');

export type BrandStackProps = {
  onNext: () => void;
};

export type SplashScreenProps = {
  onNext: () => void;
};
