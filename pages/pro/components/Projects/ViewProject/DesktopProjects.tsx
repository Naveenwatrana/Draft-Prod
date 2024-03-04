import { useMemo, useState } from 'react';
import { dateFormatMY } from 'common/constants';
import { formatDate } from 'common/utils/date/dateFormat';
import ModalElement from 'components/Modal/Modal';
import PencilIcon from 'components/Icons/pencil.svg';
import { useEditProjectMutation } from 'pages/pro/profileService';
import lang from 'common/lang';
import { SubmitHandler } from 'react-hook-form';
import {
  ProjectsMeta,
  ProjectTitle,
  ProjectDuration, ProjectDescription, ProjectImage, ProjectImageContainer, ProjectHead,
  DesktopWrapper, ProjectDetails, ProjectBox, NewProjectIcon, SkillTag, SkillsContainer, MoreDesc, DescriptionContainer, DetailsContainer,
} from 'pages/pro/components/Projects/ViewProject/styles';
import { NotificationType, ProjectProps } from 'pages/pro/components/Projects/ViewProject/types';
import EditProjects from 'pages/pro/components/Projects/EditProject';
import { formatProjectData, formatProjectPayload, showNotification } from 'pages/pro/components/Projects/util';
import { IProjectValues } from 'pages/pro/components/Projects/types';
import { useProjects } from 'pages/pro/components/Projects/ViewProject/useProjects';
import { trimLine } from 'common/utils/helpers';
import { IconContainer, IconsContainer } from 'pages/pro/styles';
import TrashIcon from 'components/Icons/TrashIcon';
import { theme } from 'common/theme';
import DeleteModal from 'pages/pro/components/TextBlock/DeleteModal';
import ProjectModal from './ProjectModal';

const { projects } = lang;

const DesktopProject = ({ data }: ProjectProps) => {
  const startDate = formatDate(data.start_date, dateFormatMY);
  const endDate = (data.end_date && !data.ongoing) ? formatDate(data.end_date, dateFormatMY) : 'Now';
  const date = `${startDate} - ${endDate}`;
  const [editProject, setEditProject] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editProjectApi, results] = useEditProjectMutation();
  const { saveProjectImages, loading } = useProjects();
  const closeModal = () => {
    setEditProject(false);
  };
  const closeProjectModal = () => {
    setOpenModal(false);
  };
  const saveProject: SubmitHandler<IProjectValues> = async (formData) => {
    try {
      const profileImagePath = await saveProjectImages(formData);
      await editProjectApi({ payload: formatProjectPayload(formData, profileImagePath, formData.deletedImages), id: formData.id });
      setEditProject(false);
      showNotification(projects.updatedSuccess, NotificationType.SUCCESS);
    } catch (e: any) {
      showNotification(projects.updatingError, NotificationType.ERROR);
    }
  };
  const coverImage = data.project_images?.find((images) => images.featured);

  const handleOpenEditProject = (e: any) => {
    e.stopPropagation();
    closeProjectModal();
    setEditProject(true);
  };

  const openProjectModal = () => setOpenModal(true);
  const filterTag = (limit: number) => {
    let lengthOfTag = 0;
    return data?.tags?.filter((tag) => {
      lengthOfTag += tag.tag.length + 2;
      return lengthOfTag < limit;
    });
  };
  const tagsToShow = useMemo(() => {
    if (coverImage) {
      return filterTag(65);
    } else {
      return filterTag(130);
    }
  }, [coverImage, data?.tags]);

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const handleDelete = () => {
    // TODO: API Integration
  };

  return (
    <DesktopWrapper>
      <ModalElement isOpen={deleteModalOpen} closeModal={closeDeleteModal}>
        <DeleteModal onClose={closeDeleteModal} onDelete={handleDelete} />
      </ModalElement>
      <ProjectHead>
        <ProjectBox>
          <NewProjectIcon>
            <ProjectDetails>
              <ProjectTitle>{data.project_or_company || data.title}</ProjectTitle>
              <ProjectDuration>
                {date}
              </ProjectDuration>
            </ProjectDetails>
            <IconsContainer>
              <IconContainer contained data-cy={`editProject${data.id}`} onClick={handleOpenEditProject}>
                <PencilIcon size={16} />
              </IconContainer>
              <IconContainer onClick={() => setDeleteModalOpen(true)}>
                <TrashIcon color={theme.palette.red[100].value} size={16} />
              </IconContainer>
            </IconsContainer>
          </NewProjectIcon>
          <ProjectsMeta>
            <DetailsContainer component="div" withImage={!!coverImage}>
              <DescriptionContainer>
                {data?.description
                && (
                  <ProjectDescription withImage={!!coverImage}>
                    {trimLine(data.description)}
                  </ProjectDescription>
                )}
                {data.description && <MoreDesc onClick={openProjectModal} data-cy={`descriptionProject${data.id}`}>...</MoreDesc>}
              </DescriptionContainer>
              <SkillsContainer expanded={!coverImage}>
                {tagsToShow?.map((tag) => <SkillTag key={tag.id}>{tag.tag}</SkillTag>)}
                {data?.tags?.length > tagsToShow?.length && (
                  <SkillTag clickable onClick={openProjectModal} data-cy={`descriptionTags${data.id}`}>
                    +
                    {data.tags.length - tagsToShow.length}
                  </SkillTag>
                )}
              </SkillsContainer>
            </DetailsContainer>
            {coverImage && (
              <ProjectImageContainer>
                <ProjectImage src={coverImage.image_path} />
              </ProjectImageContainer>
            )}
          </ProjectsMeta>
        </ProjectBox>
      </ProjectHead>
      <ProjectModal isEditable open={openModal} onClose={closeProjectModal} data={data} date={date} onEdit={handleOpenEditProject} />
      <ModalElement isOpen={editProject} closeModal={closeModal}>
        <EditProjects
          cancel={closeModal}
          save={saveProject}
          values={formatProjectData(data)}
          isLoading={results.isLoading || loading}
        />
      </ModalElement>

    </DesktopWrapper>
  );
};

export default DesktopProject;
