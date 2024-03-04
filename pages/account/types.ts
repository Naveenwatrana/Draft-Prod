/* eslint-disable @typescript-eslint/naming-convention */
export type SignInDTO = {
  email: string;
  password: string;
};

export type SignUpDTO = {
  email: string;
  password: string;
};

export type RecoverPassDTO = {
  email: string;
};

export type ResetPassDTO = {
  password: string;
  token: string | undefined;
};

export type SignInResponseDTO = {
  data: User & Token;
};

export type Company = {
  created_at: string;
  headcount: string;
  id: number;
  industries: any[] | null;
  logo: string;
  name: string;
  updated_at: string;
  url: string;
  user_id: number;
}

export type User = {
  id: number;
  email: string;
  first_name: string;
  companies?: Company[];
  onboarding_status: string;
};

export type Token = {
  token: string;
  type: string;
};

export type AuthState = {
  user: User | null;
  token: Token | null;
  currentCompany: Company | null;
};

export type IResetPasswordFormValues = {
  password: string;
  confirmPassword: string;
};

export type ISigninFormValues = {
  email: string,
  password: string,
};

export type ISignupFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

export type ITermsProps = {
  handleTerms: () => void;
};

export type IRecoverPasswordFormValues = {
  email: string;
};

export type IRecoverSuccessProps = {
  email: string;
};
