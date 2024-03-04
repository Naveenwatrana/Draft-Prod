import { StaticImageData } from 'next/image';

export type InfoProps = {
  image?: string | StaticImageData;
  mantra?: string;
  fullName?: string;
};

export type BioProps = {
  bio?: string;
  fullName?: string;
};

export type IProjectAttributes = {
  startDate: string;
  ongoing: boolean;
  endDate: string;
  title: string;
  role?: string;
};

export type ProjectProps = {
  projects: IProjectAttributes[];
  fullName?: string;
};
