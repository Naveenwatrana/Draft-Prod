import {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { dateFormatMY } from 'common/constants';
import { formatDate } from 'common/utils/date/dateFormat';
import ModalElement from 'components/Modal/Modal';
import PencilIcon from 'components/Icons/pencil.svg';
import {
  useDeleteBlockMutation,
  useEditBlockMutation,
} from 'pages/pro/profileService';
import lang from 'common/lang';
import { SubmitHandler } from 'react-hook-form';
import {
  ProjectsMeta,
  ProjectTitle,
  ProjectDuration,
  ProjectDescription,
  ProjectImage,
  ProjectImageContainer,
  ProjectHead,
  DesktopWrapper,
  ProjectDetails,
  ProjectBox,
  NewProjectIcon,
  SkillTag,
  SkillsContainer,
  MoreDesc,
  DescriptionContainer,
  DetailsContainer,
  Wrapper,
} from 'pages/pro/components/Projects/ViewProject/styles';
import {
  NotificationType,
  ProjectProps,
} from 'pages/pro/components/Projects/ViewProject/types';
import EditProjects from 'pages/pro/components/Projects/EditProject';
import {
  formatProjectBlockPayload,
  formatProjectData,
  showNotification,
} from 'pages/pro/components/Projects/util';
import { IProjectValues } from 'pages/pro/components/Projects/types';
import { trimLine } from 'common/utils/helpers';
import {
  IconContainer,
  IconsContainer,
  MobileIconsContainer,
} from 'pages/pro/styles';
import TrashIcon from 'components/Icons/TrashIcon';
import { theme } from 'common/theme';
import DeleteModal from 'pages/pro/components/TextBlock/DeleteModal';
import Loader from 'components/Loader/Loader';
import { uploadMediaFile } from 'utils/uploadMediaFile';
import { selectCurrentUser } from 'pages/account/authSlice';
import { useAppDispatch, useAppSelector } from 'common/hooks/state';
import { getIsCurrentUser, isUserEditing, setIsEditing } from 'pages/pro/profileSlice';
import { ReadMore } from 'pages/pro/components/Blocks/styles';
import ButtonComp from 'components/buttonComp';
import { useWindowDimensions } from 'common/hooks';
import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import TextComp from 'components/textComp';
import ProjectModal from '../ViewProject/ProjectModal';
import { ContentContainer } from './style';
const { projects, bio } = lang;

const ProjectBlock = ({ data }: ProjectProps) => {
  const { isDesktopView } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const startDate = formatDate(data.start_date, dateFormatMY);
  const endDate = data.end_date && !data.ongoing
    ? formatDate(data.end_date, dateFormatMY)
    : 'Now';
  const date = `${startDate} - ${endDate}`;
  const [editProject, setEditProject] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editBlock, editBlockResult] = useEditBlockMutation();
  const [deleteBlock, deleteBlockResult] = useDeleteBlockMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentUser = useAppSelector(selectCurrentUser);
  const isCurrentUser = useAppSelector(getIsCurrentUser);
  const isEditing = useAppSelector(isUserEditing);
  const closeModal = () => {
    setEditProject(false);
  };
  const closeProjectModal = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    if (!isEditing) {
      setIsProjectEditing(false);
    }
  }, [isEditing]);
  const saveProject: SubmitHandler<IProjectValues> = async (formData) => {
    try {
      setIsLoading(true);
      const updatedFormData = {
        ...formData,
        savedImages: formData.savedImages?.sort(
          (a, b) => (a?.featured ? 0 : 1) - (b?.featured ? 0 : 1),
        ),
        image: formData.image?.sort(
          (a, b) => (a?.featured ? 0 : 1) - (b?.featured ? 0 : 1),
        ),
      };
      const uploadedImages = updatedFormData?.image?.map(async (image) => {
        if (image.file) {
          const media = await uploadMediaFile(image.file, currentUser.username);
          return media;
        }
      });
      let media = uploadedImages ? await Promise.all(uploadedImages) : [];
      if (updatedFormData.image?.some((image) => image.featured)) {
        media = media.concat(
          (updatedFormData.savedImages || [])?.map(
            (savedImage) => savedImage.imagePath,
          ),
        );
      } else {
        media = (updatedFormData.savedImages || [])
          ?.map((savedImage) => savedImage.imagePath)
          .concat(media);
      }
      const payload = formatProjectBlockPayload(updatedFormData);
      const body = {
        type: 'project',
        sort: data.sort || 1,
        fields: { ...payload, media },
      };
      editBlock({ id: data?.id, payload: body })
        .unwrap()
        .then(() => {
          showNotification(projects.updatedSuccess, NotificationType.SUCCESS);
        })
        .catch((error) => {
          showNotification(error?.data?.message, NotificationType.ERROR);
        });
    } catch (e: any) {
      showNotification(projects.updatingError, NotificationType.ERROR);
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };
  const coverImage = (data?.media as string[])?.[0];
  const savedImages = (data?.media as string[])?.map((str, index) => {
    return {
      featured: index === 0,
      imagePath: str,
      project_id: data?.id,
      id: '1',
    };
  });
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
    if (!isDesktopView) return filterTag(55);
    if (coverImage) {
      return filterTag(65);
    } else {
      return filterTag(130);
    }
  }, [coverImage, data?.tags, isDesktopView]);

  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [isProjectEditing, setIsProjectEditing] = useState<boolean>(false);
  const closeDeleteModal = () => setDeleteModalOpen(false);
  const closeEditing = () => {
    setIsProjectEditing(false);
    dispatch(setIsEditing(false));
  };
  const wrapperRef = useRef(null);
  useOutsideAlerter({
    ref: wrapperRef,
    outSideClick: closeEditing,
  });

  const handleDelete = async () => {
    if (data?.id) {
      setIsLoading(true);
      try {
        deleteBlock({ id: data.id }).unwrap();
      } catch (error: any) {
        showNotification(error?.data?.message, NotificationType.ERROR);
      } finally {
        closeDeleteModal();
        setIsLoading(false);
      }
    }
  };
  return isDesktopView ? (
    <DesktopWrapper>
      {(deleteBlockResult.isLoading
        || editBlockResult.isLoading
        || isLoading) && <Loader />}
      {isCurrentUser && (
        <ModalElement isOpen={deleteModalOpen} closeModal={closeDeleteModal}>
          <DeleteModal onClose={closeDeleteModal} onDelete={handleDelete} />
        </ModalElement>
      )}
      <ProjectHead>
        <ProjectBox>
          <ContentContainer>
            <NewProjectIcon>
              <ProjectDetails>
                <ProjectTitle>{data.title}</ProjectTitle>
                <ProjectDuration>{date}</ProjectDuration>
              </ProjectDetails>
              {isCurrentUser && (
                <IconsContainer>
                  <IconContainer
                    contained
                    data-cy={`editProject${data.id}`}
                    onClick={handleOpenEditProject}
                  >
                    <PencilIcon size={16} />
                  </IconContainer>
                  <IconContainer data-cy={`deleteProject${data.id}`} onClick={() => setDeleteModalOpen(true)}>
                    <TrashIcon color={theme.palette.red[100].value} size={16} />
                  </IconContainer>
                </IconsContainer>
              )}
            </NewProjectIcon>
            <ProjectsMeta>
              <DetailsContainer component="div" withImage={!!coverImage}>
                <DescriptionContainer>
                  {data?.description && (
                    <ProjectDescription withImage={!!coverImage}>
                      {trimLine(data.description)}
                    </ProjectDescription>
                  )}
                  {data.description && (
                    <MoreDesc
                      onClick={openProjectModal}
                      data-cy={`descriptionProject${data.id}`}
                    >
                      ...
                    </MoreDesc>
                  )}
                </DescriptionContainer>
                <SkillsContainer expanded={!coverImage}>
                  {tagsToShow?.map((tag) => (
                    <SkillTag key={tag.id}>{tag.tag}</SkillTag>
                  ))}
                  {data?.tags?.length > tagsToShow?.length && (
                    <SkillTag
                      clickable
                      onClick={openProjectModal}
                      data-cy={`descriptionTags${data.id}`}
                    >
                      +
                      {data.tags.length - tagsToShow.length}
                    </SkillTag>
                  )}
                </SkillsContainer>
              </DetailsContainer>
            </ProjectsMeta>
            <ButtonComp
              variant="link"
              data-cy="readMoreBlock"
              label={<ReadMore>{bio.readMore}</ReadMore>}
              onClick={openProjectModal}
            />
          </ContentContainer>
          {coverImage && (
            <ProjectImageContainer>
              <ProjectImage src={coverImage} />
            </ProjectImageContainer>
          )}
        </ProjectBox>
      </ProjectHead>
      <ProjectModal
        open={openModal}
        onClose={closeProjectModal}
        data={data}
        date={date}
        onEdit={handleOpenEditProject}
        isEditable={isCurrentUser}
      />
      {isCurrentUser && (
        <ModalElement isOpen={editProject} closeModal={closeModal}>
          <EditProjects
            cancel={closeModal}
            save={saveProject}
            values={{ ...formatProjectData(data), savedImages }}
            isLoading={editBlockResult.isLoading}
          />
        </ModalElement>
      )}
    </DesktopWrapper>
  ) : (
    <Wrapper
      ref={wrapperRef}
      onClick={() => {
        if (!isDesktopView && !deleteModalOpen && !editProject) {
          dispatch(setIsEditing(true));
          setIsProjectEditing(true);
        }
      }}
      data-cy={`wrapperRef${data.id}`}
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
            data-cy={`editProject${data.id}`}
          >
            <PencilIcon size={16} />
          </IconContainer>
          <IconContainer
            onClick={(e) => {
              e.stopPropagation();
              setDeleteModalOpen(true);
              closeEditing();
            }}
            data-cy={`deleteProject${data.id}`}
          >
            <TrashIcon color={theme.palette.red[100].value} size={16} />
          </IconContainer>
        </MobileIconsContainer>
      )}
      {coverImage && (
        <ProjectImageContainer>
          <ProjectImage src={coverImage} alt={data.project_or_company} />
        </ProjectImageContainer>
      )}
      <ProjectHead>
        <ProjectDetails>
          <ProjectTitle>{data.title}</ProjectTitle>
          <ProjectDuration>{date}</ProjectDuration>
        </ProjectDetails>
      </ProjectHead>
      <TextComp component="div">
        <DescriptionContainer>
          {data?.description && (
            <ProjectDescription withImage={!!coverImage}>
              {trimLine(data.description)}
            </ProjectDescription>
          )}
          {data.description && (
            <MoreDesc
              onClick={openProjectModal}
              data-cy={`descriptionProject${data.id}`}
            >
              ...
            </MoreDesc>
          )}
        </DescriptionContainer>
        <SkillsContainer expanded={!coverImage}>
          {tagsToShow?.map((tag) => (
            <SkillTag key={tag.id}>{tag.tag}</SkillTag>
          ))}
          {data?.tags?.length > tagsToShow.length && (
            <SkillTag
              clickable
              onClick={openProjectModal}
              data-cy={`descriptionTags${data.id}`}
            >
              +
              {data.tags.length - tagsToShow.length}
            </SkillTag>
          )}
        </SkillsContainer>
      </TextComp>
      <ButtonComp
        variant="link"
        data-cy="readMoreBlock"
        label={<ReadMore>{bio.readMore}</ReadMore>}
        onClick={() => {}}
      />
      <ModalElement isOpen={editProject} closeModal={closeModal}>
        <EditProjects
          cancel={closeModal}
          save={saveProject}
          values={{ ...formatProjectData(data), savedImages }}
          isLoading={editBlockResult.isLoading}
        />
      </ModalElement>
    </Wrapper>
  );
};

export default ProjectBlock;
