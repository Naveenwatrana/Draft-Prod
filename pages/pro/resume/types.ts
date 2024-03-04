import { IEducation } from '../components/Education/types';
import { ISideProjectData } from '../components/Projects/SideProject/Edit/types';
import { IExperienceData } from '../components/WorkExperience/type';
import { IProfileData } from '../types';

export type UserResumePageProps = {
  userName: string;
  data: IProfileData;
  previousRoute?: string;
  ownProfile: boolean;
};

export type ResumeContentProps = {
  resumeData: any;
  ownProfile: boolean;
  workExperienceData: IExperienceData[];
  projectsData: ISideProjectData[];
  educationData: IEducation[];
  isLoading: boolean;
  setSkip: (skip: boolean) => void;
};
