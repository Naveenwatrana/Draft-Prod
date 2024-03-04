import { IDescriptionProjectValues, ISideProjectData, ISummaryProjectValues } from './types';

export const getSummaryFormData = (
  data: ISideProjectData,
): ISummaryProjectValues => {
  return {
    projectName: data.name,
    role: data?.role || '',
    startDate: data.start_date,
    endDate: data.end_date || '',
    ongoing: data.ongoing,
    associated: !!data?.experience_id,
  };
};

export const getDescriptionFormData = (
  data: ISideProjectData,
): IDescriptionProjectValues => {
  return {
    savedImages: data.project_media?.map((image, index) => ({
      featured: index === 0,
      project_id: image.project_id,
      imagePath: image.url,
      id: image.id,
    })),
    description: data.description,
    skillsAndTechnologiesUsed: data?.tags?.map((tagData) => {
      return {
        label: tagData.tag,
        value: tagData.id,
      };
    }),
    //   providedSkillsAndTechnologiesUsed?: IOption & { tags: ITagResponse[] },
  };
};
