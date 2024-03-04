import lang from 'common/lang';
import { MyOptionType } from 'components/Select/types';
import { maxRoleTitleCharacters, minRoleTitleCharacters } from 'pages/pro/components/Projects/constant';
import * as yup from 'yup';

const {
  userOnBoarding: {
    profileForm: { FirstnameInput, LastnameInput },
  },
} = lang;

export type NameProps = {
  onNext: (values: IOnBoardingValues) => void;
  onBoardingData: IOnBoardingValues | undefined;
};

export enum CreateOnBoardingSteps {
  NAME = 1,
  RESUME = 2,
  BRAND = 3,
}

export type NavbarProps = {
  step: number;
  onBack: () => void;
  title: string;
};

export const nameDetailsSchema = yup.object().shape({
  firstName: yup
    .string()
    .max(maxRoleTitleCharacters, LastnameInput.maxCharactersRefired)
    .min(minRoleTitleCharacters, LastnameInput.minCharactersRefired)
    .required(FirstnameInput.error),
  lastName: yup
    .string()
    .max(maxRoleTitleCharacters, LastnameInput.maxCharactersRefired)
    .min(minRoleTitleCharacters, LastnameInput.minCharactersRefired)
    .required(LastnameInput.error),
  location: yup.object().shape({
    label: yup.string().required('required'),
    value: yup.string().required('required'),
  }),
});

export type IOnBoardingValues = {
  firstName: string;
  lastName: string;
  location: MyOptionType;
};

export type OnboardingProps = {
  onboardingStep: number;
};
