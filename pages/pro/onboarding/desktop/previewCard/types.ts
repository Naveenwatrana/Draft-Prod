import { ReactElement } from 'react';

export type PreviewCardProps = {
    fullName: string;
    picture: string;
    mantra: string;
    bio?: string;
    project?: any; // FIXME: type
    css?:string
    currentStep: any; // FIXME: type
    children?: ReactElement;
  }

export type IAddDataParams = {
    image?: string;
    mantra?: string;
    bio?: string;
    project?: any; // FIXME: type

}

export type IStepConfig = {
    content: JSX.Element;
  }

export type MantraSetionProps = {
    mantra: string;
  }

export type BioSectionProps = {
    bio?: string;
  }

export type NameSectionProps = {
    fullName: string;
  }

export type ImageSectionProps = {
    image: string;
  }

export type IProject = {
    title?: string;
    role?: string;
    startDate?: string;
    endDate?: string;
    ongoing?: boolean;
  }

export type ProjectSectionProps = {
  project?: any; // FIXME: type
}
