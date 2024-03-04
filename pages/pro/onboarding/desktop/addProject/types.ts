import { IOption } from 'components/MultipleInputTextArea/types';

export type AddProjectProps = {
  // setProject: (value: IAddProjectFormValues) => void;
  setProject: any; // FIXME: need to fix the type error when using the top line
  nextStep: () => void;
};

export type IAddProjectFormValues = {
  title: string;
  role?: string;
  startDate: string;
  endDate: string;
  ongoing: boolean;
  tags: IOption[];
};

export type IWatchProjectValues = {
  title: string;
  role?: string;
  startDate: string;
  endDate: string;
  ongoing: boolean;
  tags: IOption[];
};
