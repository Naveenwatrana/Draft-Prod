import { IProjectsPayload, ITagResponse } from 'pages/pro/components/Projects/types';
import { IOption } from 'components/MultipleInputTextArea/types';
import { ISideProjectData } from '../SideProject/Edit/types';

export type ViewProjectProps = {
    projects: IProjectsPayload[];
    addNewProject: () => void;
};
export type ProjectProps = {
    data: IProjectsPayload;
};

export type SideProjectProps = {
  data: ISideProjectData;
  editable?: boolean;
  withExperience?: boolean;
  onRefetch?: () => void;
  associatedWith?: (IOption & { tags: ITagResponse[] });
};

export type ProjectDescriptionProps = {
  readonly withImage: boolean;
}
export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error'
}
