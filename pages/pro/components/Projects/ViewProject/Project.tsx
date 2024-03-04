import {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { dateFormatMY } from 'common/constants';
import { formatDate } from 'common/utils/date/dateFormat';
import ModalElement from 'components/Modal/Modal';
import PencilIcon from 'components/Icons/pencil.svg';
import { useEditProjectMutation } from 'pages/pro/profileService';
import { lang } from 'common/lang';
import { SubmitHandler } from 'react-hook-form';
import {
  Wrapper, ProjectTitle, ProjectDuration, ProjectDescription, ProjectImage, ProjectImageContainer,
  ProjectHead, ProjectDetails, SkillsContainer, SkillTag, DescriptionContainer, MoreDesc,
} from 'pages/pro/components/Projects/ViewProject/styles';
import { NotificationType, ProjectProps } from 'pages/pro/components/Projects/ViewProject/types';
import EditProjects from 'pages/pro/components/Projects/EditProject';
import { formatProjectData, formatProjectPayload, showNotification } from 'pages/pro/components/Projects/util';
import { IProjectValues } from 'pages/pro/components/Projects/types';
import { useProjects } from 'pages/pro/components/Projects/ViewProject/useProjects';
import TextComp from 'components/textComp';
import { trimLine } from 'common/utils/helpers';
import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import { useWindowDimensions } from 'common/hooks';
import { useAppDispatch, useAppSelector } from 'common/hooks/state';
import { isUserEditing, setIsEditing } from 'pages/pro/profileSlice';
import { IconContainer, MobileIconsContainer } from 'pages/pro/styles';
import TrashIcon from 'components/Icons/TrashIcon';
import { theme } from 'common/theme';
import DeleteModal from 'pages/pro/components/TextBlock/DeleteModal';
import ProjectModalMobile from './ProjectModalMobile';

const { projects } = lang;

const Project = ({ data }: ProjectProps) => {
  const startDate = formatDate(data.start_date, dateFormatMY);
  const endDate = (data.end_date && !data.ongoing) ? formatDate(data.end_date, dateFormatMY) : 'Now';
  const date = `${startDate} - ${endDate}`;
  const [editProject, setEditProject] = useState(false);
  const [editProjectApi, results] = useEditProjectMutation();
  const { saveProjectImages, loading } = useProjects();
  const [openModal, setOpenModal] = useState(false);
  const closeProjectModal = () => {
    setOpenModal(false);
  };
  const openProjectModal = () => setOpenModal(true);
  const handleOpenEditProject = (e: any) => {
    e.stopPropagation();
    closeProjectModal();
    setEditProject(true);
  };

  const closeModal = () => {
    setEditProject(false);
  };
  const saveProject: SubmitHandler<IProjectValues> = async (formData) => {
    try {
      const profileImagePath = await saveProjectImages(formData);
      await editProjectApi({ payload: formatProjectPayload(formData, profileImagePath), id: formData.id });
      setEditProject(false);
      showNotification(projects.updatedSuccess, NotificationType.SUCCESS);
    } catch (e: any) {
      showNotification(projects.updatingError, NotificationType.ERROR);
    }
  };
  const coverImage = data.project_images?.find((images) => images.featured);
  const filterTag = (limit: number) => {
    let lengthOfTag = 0;
    return data?.tags?.filter((tag) => {
      lengthOfTag += tag.tag.length;
      return lengthOfTag < limit;
    });
  };
  const tagsToShow = useMemo(() => {
    return filterTag(55);
  }, [data?.tags]);

  const [isProjectEditing, setIsProjectEditing] = useState<boolean>(false);
  const isEditing = useAppSelector(isUserEditing);
  const closeEditing = () => {
    setIsProjectEditing(false);
    dispatch(setIsEditing(false));
  };
  useEffect(() => {
    if (!isEditing) {
      setIsProjectEditing(false);
    }
  }, [isEditing]);
  const wrapperRef = useRef(null);
  useOutsideAlerter({
    ref: wrapperRef,
    outSideClick: closeEditing,
  });
  const { isDesktopView } = useWindowDimensions();
  const dispatch = useAppDispatch();

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const handleDelete = () => {
    // TODO: API Integration
  };

  if (!data) return null;
  return (
    <Wrapper
      ref={wrapperRef}
      onClick={() => {
        if (!isDesktopView && !deleteModalOpen && !editProject) {
          dispatch(setIsEditing(true));
          setIsProjectEditing(true);
        }
      }}
      isActive={isProjectEditing}
    >
      <ModalElement isOpen={deleteModalOpen} closeModal={closeDeleteModal}>
        <DeleteModal onClose={closeDeleteModal} onDelete={handleDelete} />
      </ModalElement>
      {!isDesktopView && isProjectEditing && (
        <MobileIconsContainer>
          <IconContainer
            contained
            onClick={(e) => {
              e.stopPropagation();
              setEditProject(true);
              closeEditing();
            }}
          >
            <PencilIcon size={16} />
          </IconContainer>
          <IconContainer
            onClick={(e) => {
              e.stopPropagation();
              setDeleteModalOpen(true);
              closeEditing();
            }}
          >
            <TrashIcon color={theme.palette.red[100].value} size={16} />
          </IconContainer>
        </MobileIconsContainer>
      )}
      <ProjectHead>
        <ProjectDetails>
          <ProjectTitle>{data.project_or_company}</ProjectTitle>
          <ProjectDuration>
            {date}
          </ProjectDuration>
        </ProjectDetails>
        {coverImage && (
          <ProjectImageContainer>
            <ProjectImage src={coverImage.image_path} alt={data.project_or_company} />
          </ProjectImageContainer>
        )}
      </ProjectHead>
      <TextComp component="div">
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
          {data?.tags?.length > tagsToShow.length && (
            <SkillTag clickable onClick={openProjectModal} data-cy={`descriptionTags${data.id}`}>
              +
              {data.tags.length - tagsToShow.length}
            </SkillTag>
          )}
        </SkillsContainer>
      </TextComp>
      <ProjectModalMobile open={openModal} onClose={closeProjectModal} data={data} date={date} onEdit={handleOpenEditProject} />
      <ModalElement isOpen={editProject} closeModal={closeModal}>
        <EditProjects
          cancel={closeModal}
          save={saveProject}
          values={formatProjectData(data)}
          isLoading={results.isLoading || loading}
        />
      </ModalElement>

    </Wrapper>
  );
};

export default Project;
