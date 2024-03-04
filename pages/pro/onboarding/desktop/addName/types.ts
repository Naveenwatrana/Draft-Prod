import { MyOptionType } from 'components/Select/types';

export type AddNameProps = {
    nextStep: () => void;
    setFullName: React.Dispatch<React.SetStateAction<string>>;
}

export type IAddNameFormValues = {
    firstName: string;
    lastName: string;
    location: MyOptionType;
  };
