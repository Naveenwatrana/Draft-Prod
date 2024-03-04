import {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { dateFormatMY } from 'common/constants';
import { formatDate } from 'common/utils/date/dateFormat';
import { useIsMobile } from 'common/hooks/useIsMobile';
import ModalElement from 'components/Modal/Modal';
import {
  useDeleteProjectMutation,
  useEditBlockMutation,
} from 'pages/pro/profileService';
import lang from 'common/lang';
import {
  NotificationType,
  SideProjectProps,
} from 'pages/pro/components/Projects/ViewProject/types';
import { trimLine } from 'common/utils/helpers';
import {
  ActionDeleteIconContainer,
  ActionIconContainer,
  ActionIconsContainer,
  IconContainer,
  MobileIconsContainer,
} from 'pages/pro/styles';
import TrashIcon from 'components/Icons/TrashIcon';
import { theme } from 'common/theme';
import Loader from 'components/Loader/Loader';
import { useAppDispatch, useAppSelector } from 'common/hooks/state';
import {
  isUserEditing,
  setIsEditing,
} from 'pages/pro/profileSlice';
import { ReadMore } from 'pages/pro/components/Blocks/styles';
import ButtonComp from 'components/buttonComp';
import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import TextComp from 'components/textComp';
import { loginUrl } from 'common/utils/network/appRouts';
import { useNavigate } from 'common/utils/router-fill';
import CalenderIcon from 'components/Icons/CalenderIcon';
import { useLoggedInUser } from 'common/hooks/useLoggedInUser';
import DeleteModal from 'pages/pro/Tabs/DeleteModal';
import PencilIcon from 'components/Icons/PencilIcon';
import ProjectModal from '../ViewProject/ProjectModal';
import {
  ContentContainer, ProjectsMeta,
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
  ProjectRole,
} from './style';
import EditProjects from './Edit';
import { showNotification } from '../util';
const {
  profile: {
    deleteLabel,
    editLabel,
    block: {
      delete: { deleteProject },
    },
  },
  bio,
  projects: { deleteMessage },
} = lang;

const SideProject = ({
  data, withExperience, editable = false, associatedWith, onRefetch,
}: SideProjectProps) => {
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const startDate = formatDate(data.start_date, dateFormatMY);
  const endDate = data.end_date && !data.ongoing
    ? formatDate(data.end_date, dateFormatMY)
    : 'Now';
  const date = `${startDate} - ${endDate}`;
  const [editProject, setEditProject] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [, editBlockResult] = useEditBlockMutation();
  const [deleteProjectApi, deleteProjectResult] = useDeleteProjectMutation();
  const [isLoading] = useState<boolean>(false);
  const isEditing = useAppSelector(isUserEditing);
  const navigate = useNavigate();
  const LoggedInUser = useLoggedInUser();
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
  const mediaImages = useMemo(() => data?.project_media?.map(({ url }) => url), [data]);
  const coverImage = (mediaImages as string[])?.[0];

  const handleOpenEditProject = (e: any) => {
    e.stopPropagation();
    closeProjectModal();
    setEditProject(true);
  };

  const openProjectModal = () => {
    if (!LoggedInUser) {
      navigate(loginUrl);
      return;
    }
    setOpenModal(true);
  };
  const filterTag = (limit: number) => {
    let lengthOfTag = 0;
    return data?.tags?.filter((tag) => {
      lengthOfTag += tag.tag.length + 2;
      return lengthOfTag < limit;
    });
  };
  const tagsToShow = useMemo(() => {
    if (isMobile) return filterTag(55);
    if (coverImage) {
      return filterTag(65);
    } else {
      return filterTag(130);
    }
  }, [coverImage, data?.tags, isMobile]);

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

  const handleDelete = async (id: string) => {
    deleteProjectApi({ id })
      .unwrap()
      .then(() => {
        showNotification(deleteMessage, NotificationType.SUCCESS);
        onRefetch && onRefetch();
      })
      .catch((error) => {
        showNotification(error?.data?.message, NotificationType.ERROR);
      })
      .finally(() => {
        closeDeleteModal();
      });
  };
  return !isMobile ? (
    <DesktopWrapper withExperience={withExperience}>
      {(deleteProjectResult.isLoading
        || editBlockResult.isLoading
        || isLoading) && <Loader />}
      {editable && (
        <ModalElement isOpen={deleteModalOpen} closeModal={closeDeleteModal}>
          <DeleteModal onClose={closeDeleteModal} onDelete={() => handleDelete(data.id)} deleteType={deleteProject} dynamicContent={` ${data.name} `} />
        </ModalElement>
      )}
      <ProjectHead>
        <ProjectBox>
          <ContentContainer>
            <NewProjectIcon>
              <ProjectDetails>
                <ProjectTitle>{data.name}</ProjectTitle>
                {data?.role && <ProjectRole>{data.role}</ProjectRole>}
                <ProjectDuration>
                  <CalenderIcon />
                  <span>{date}</span>
                </ProjectDuration>
              </ProjectDetails>
              {editable && (
                <ActionIconsContainer>
                  <ActionIconContainer
                    data-cy={`editProject${data.id}`}
                    onClick={handleOpenEditProject}
                  >
                    <PencilIcon size={16} />
                    <TextComp component="h6">{editLabel}</TextComp>
                  </ActionIconContainer>
                  <ActionDeleteIconContainer
                    data-cy={`deleteProject${data.id}`}
                    onClick={() => setDeleteModalOpen(true)}
                  >
                    <TrashIcon color={theme.palette.red[100].value} size={16} />
                    <TextComp component="h6">{deleteLabel}</TextComp>
                  </ActionDeleteIconContainer>
                </ActionIconsContainer>
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
                  {/*
                    TODO :
                    This is not working as expected. All of the description is showing up.
                    and there is no reason to add a dot at the end.
                   */}
                  {/* {data.description && (
                    <MoreDesc
                      onClick={openProjectModal}
                      data-cy={`descriptionProject${data.id}`}
                    >
                      ...
                    </MoreDesc>
                  )} */}
                </DescriptionContainer>
                <SkillsContainer expanded={!coverImage}>
                  {tagsToShow?.map((tag) => (
                    <SkillTag key={tag.id} selected={tag.selected}>{tag.tag}</SkillTag>
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
        data={data as any /* TODO update modal */}
        date={date}
        onEdit={handleOpenEditProject}
        isEditable={editable}
      />
      {editable && (
        <ModalElement isOpen={editProject} closeModal={closeModal}>
          <EditProjects
            cancel={closeModal}
            isLoading={editBlockResult.isLoading}
            values={data}
            associatedWith={associatedWith}
            onRefetch={onRefetch}
          />
        </ModalElement>
      )}
    </DesktopWrapper>
  ) : (
    <Wrapper
      withExperience={withExperience}
      ref={wrapperRef}
      onClick={(e) => {
        if (isMobile && !deleteModalOpen && !editProject) {
          e.stopPropagation();
          dispatch(setIsEditing(true));
          setIsProjectEditing(true);
        }
      }}
      data-cy={`wrapperRef${data.id}`}
      isActive={isProjectEditing}
    >
      <ModalElement isOpen={deleteModalOpen} closeModal={closeDeleteModal}>
        <DeleteModal onClose={closeDeleteModal} onDelete={() => handleDelete(data.id)} deleteType={deleteProject} dynamicContent={` ${data.name} `} />
      </ModalElement>
      {isMobile && isProjectEditing && editable && (
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
          <ProjectImage src={coverImage} alt={data.name} />
        </ProjectImageContainer>
      )}
      <ProjectHead>
        <ProjectDetails>
          <ProjectTitle>{data.name}</ProjectTitle>
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
            <SkillTag key={tag.id} selected={tag.selected}>{tag.tag}</SkillTag>
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
        onClick={() => undefined}
      />
      <ModalElement isOpen={editProject} closeModal={closeModal}>
        <EditProjects
          cancel={closeModal}
          isLoading={editBlockResult.isLoading}
          values={data}
          associatedWith={associatedWith}
          onRefetch={onRefetch}
        />
      </ModalElement>
    </Wrapper>
  );
};

export default SideProject;
