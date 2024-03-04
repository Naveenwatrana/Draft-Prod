import { dateFormat } from 'common/constants';
import { formatDate } from 'common/utils/date/dateFormat';
import { getImageName } from 'common/utils/image';
import { toastNotificationStyles } from 'common/utils/toastNotification';
import { toast } from 'react-toastify';
import { IProjectPictureNames } from 'pages/pro/types';
import {
  ICreateProject, IDeletedImages, IProjectsPayload, IProjectValues,
} from 'pages/pro/components/Projects/types';
import { IDescriptionProjectValues, ISideProjectPayload, ISummaryProjectValues } from './SideProject/Edit/types';
const imageUploadPath = process.env.NEXT_PUBLIC_REACT_APP_IMAGE_UPLOAD_PATH;

export const formatProjectData = (projectData: IProjectsPayload): IProjectValues => {
  return {
    title: projectData.project_or_company || projectData?.title || '',
    startDate: projectData.start_date,
    endDate: projectData.end_date || '',
    ongoing: projectData.ongoing || false,
    description: projectData.description || '',
    id: projectData.id,
    savedImages: projectData.project_images?.map((image) => ({
      featured: image.featured,
      project_id: image.project_id,
      imagePath: image.image_path,
      id: image.id,
    })),
    skills: projectData?.tags?.map((tagData) => {
      return {
        label: tagData.tag,
        value: tagData.id,
      };
    }),
  };
};

export const formatProjectBlockPayload = (projectData: IProjectValues) => {
  const payload: ICreateProject = {
    title: projectData.title,
    description: projectData.description || '',
    start_date: formatDate(projectData.startDate, dateFormat),
  };
  if (projectData?.skills) {
    payload.tag_ids = projectData.skills.map((skill) => Number(skill.value));
  }
  if (projectData.ongoing) {
    payload.ongoing = 1;
  } else {
    payload.ongoing = 0;
    payload.end_date = formatDate(projectData.endDate, dateFormat);
  }
  return payload;
};
export const formatProjectPayload = (projectData: IProjectValues, image?: IProjectPictureNames[], deletedImages?: IDeletedImages[]) => {
  const payload: ICreateProject = {
    project_or_company: projectData.title,
    description: projectData.description,
    start_date: formatDate(projectData.startDate, dateFormat),
  };
  if (image) {
    payload.images = image.map((img) => ({ image_path: img.name, featured: img.featured ? 1 : 0 }));
  }
  if (projectData?.skills) {
    payload.tag_ids = projectData.skills.map((skill) => Number(skill.value));
  }
  if (projectData.ongoing) {
    payload.ongoing = 1;
  } else {
    payload.ongoing = 0;
    payload.end_date = formatDate(projectData.endDate, dateFormat);
  }
  if (deletedImages) {
    payload.deleted_images = deletedImages.map(({ id, imagePath }) => ({
      id,
      image_path: `${imageUploadPath}/${getImageName(imagePath)}`,
    }));
  }
  return payload;
};

export const showNotification = (msg: string, type: string) => {
  const isErrorNotification = type === 'error';
  toast(msg, toastNotificationStyles(isErrorNotification));
};

export const getImageUploadInputHeight = (height: string, error?: boolean) => {
  if (error) {
    return `calc(${height} + 58px)`;
  }
  return height;
};

export const formatSideProjectPayload = (
  projectData: ISummaryProjectValues & IDescriptionProjectValues,
  media: string[],
) => {
  const data: ISideProjectPayload = {
    name: projectData.projectName,
    start_date: formatDate(projectData.startDate, dateFormat),
    tag_ids:
      projectData.skillsAndTechnologiesUsed?.map((tag) => Number(tag.value))
      || [],
    description: projectData.description,
    ongoing: projectData.ongoing,
  };
  if (projectData.role) {
    data.role = projectData.role;
  }
  if (!projectData.ongoing) {
    data.end_date = formatDate(projectData.endDate, dateFormat);
  }
  if (projectData?.associatedWith?.value) {
    data.experience_id = Number(projectData.associatedWith.value);
  }
  if (media.length) {
    data.media = media.map((med) => { return { url: med }; });
  }
  return data;
};

export const sortFormImages = (formData: IDescriptionProjectValues) => {
  return {
    ...formData,
    savedImages: formData.savedImages?.sort(
      (a, b) => (a?.featured ? 0 : 1) - (b?.featured ? 0 : 1),
    ),
    image: formData.image?.sort(
      (a, b) => (a?.featured ? 0 : 1) - (b?.featured ? 0 : 1),
    ),
  };
};

export const orderMedia = (formData: IDescriptionProjectValues, media: string[]) => {
  return formData.image?.some((image) => image.featured)
    ? media.concat(
      (formData.savedImages || [])?.map(
        (savedImage) => savedImage.imagePath,
      ),
    )
    : (formData.savedImages || [])
      ?.map((savedImage) => savedImage.imagePath)
      .concat(media);
};
