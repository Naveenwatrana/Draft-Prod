import {
  MouseEvent,
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import SideProject from 'pages/pro/components/Projects/SideProject';
import ButtonComp from 'components/buttonComp';
import ChevronDown from 'components/Icons/ChevronDown';
import ChevronUp from 'components/Icons/ChevronUp';
import ActionButtons from 'pages/pro/Tabs/ActionButtons';
import lang from 'common/lang';
import ModalElement from 'components/Modal/Modal';
import DeleteModal from 'pages/pro/Tabs/DeleteModal';
import { getIsCurrentUser, isUserEditing, setIsEditing } from 'pages/pro/profileSlice';
import { useAppDispatch, useAppSelector } from 'common/hooks/state';
import { useIsMobile } from 'common/hooks/useIsMobile';
import MobileActionButtons from 'pages/pro/components/Blocks/MobileActionButtons';
import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import { ExperienceProps } from '../type';
import Content from './Content';
import Header from './Header';
import {
  Container, ExperienceWrapper, HideButtonContainer, ShowButtonContainer, StyledDivider,
} from './style';

const {
  profile: { showProjects, hideProjects, block: { delete: { deleteExperience } } },
} = lang;
const Experience = ({
  data, onDelete, onEdit, ownProfile, onRefetch,
}: ExperienceProps) => {
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const skillsAndTechnologiesUsed = useMemo(() => data.tags?.map((tagData) => {
    return {
      label: tagData.tag,
      value: tagData.id,
      selected: tagData.selected,
    };
  }), [data.tags]);
  const isCurrentUser = useAppSelector(getIsCurrentUser) || ownProfile;
  const isEditing = useAppSelector(isUserEditing);
  const [isBlockEditing, setIsBlockEditing] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const closeDeleteModal = () => setDeleteModalOpen(false);
  const handleDeleteButton = useCallback(() => setDeleteModalOpen(true), []);
  const [show, setShow] = useState(false);
  const showSideProject = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShow(true);
  };
  const hideSideProject = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setShow(false);
  };
  const handleDelete = () => {
    onDelete();
    closeDeleteModal();
  };
  const handleClick = () => {
    if (isMobile && !deleteModalOpen) {
      dispatch(setIsEditing(true));
      setIsBlockEditing(true);
    }
  };

  useEffect(() => {
    if (!isEditing) {
      setIsBlockEditing(false);
    }
  }, [isEditing]);

  const closeEditing = useCallback(() => {
    setIsBlockEditing(false);
    dispatch(setIsEditing(false));
  }, [dispatch]);

  const wrapperRef = useRef(null);
  useOutsideAlerter({
    ref: wrapperRef,
    outSideClick: closeEditing,
  });

  const handleDeleteMobile = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    closeEditing();
    handleDeleteButton();
  }, [closeEditing, handleDeleteButton]);

  const handleEditMobile = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onEdit();
  }, [onEdit]);

  return (
    <ExperienceWrapper onClick={handleClick} ref={wrapperRef}>
      <ModalElement isOpen={deleteModalOpen} closeModal={closeDeleteModal}>
        <DeleteModal onClose={closeDeleteModal} onDelete={handleDelete} deleteType={deleteExperience} dynamicContent={` ${data.company_name} `} />
      </ModalElement>
      <Container showProject={show}>
        <Header
          startDate={data?.start_date || ''}
          endDate={data?.end_date || ''}
          role={data?.role_title}
          category={data?.category?.name}
          location={data?.location}
          companyName={data?.company_name}
          logo={data?.company?.logo}
          username={data?.company?.username}
        />
        <Content
          employmentType={data.employment_type}
          locationType={data.location_type}
          roleType={data.role_type}
          peopleManaged={data.total_people_managed}
          roleDescription={data.role_description}
          benefits={data.benefits}
          skillsAndTechnologiesUsed={skillsAndTechnologiesUsed}
        />
        {!show && !!data?.projects?.length && (
          <ShowButtonContainer>
            <StyledDivider />
            <ButtonComp
              variant="link"
              label={(
                <div>
                  {`${showProjects} (${data?.projects?.length})`}
                  <ChevronDown />
                </div>
              )}
              onClick={showSideProject}
              data-cy="showSideProject"
            />
          </ShowButtonContainer>
        )}
        {isCurrentUser && !isMobile && <ActionButtons dataCy="Experience" handleDelete={handleDeleteButton} handleEdit={onEdit} />}
        {isCurrentUser && isMobile && isBlockEditing && (
          <MobileActionButtons handleDelete={handleDeleteMobile} handleEdit={handleEditMobile} />
        )}
      </Container>
      {show && !!data?.projects?.length && (
        <div>
          {data?.projects?.map((block) => (
            <SideProject key={block.id} data={block} withExperience editable={isCurrentUser} associatedWith={{ tags: data.tags, value: `${data.id}`, label: `${data?.role_title} at ${data.company_name}` }} onRefetch={onRefetch} />
          ))}
          <HideButtonContainer onClick={hideSideProject}>
            <ButtonComp
              variant="link"
              label={hideProjects}
              data-cy="hideProjects"
            />
            <ChevronUp />
          </HideButtonContainer>
        </div>
      )}
    </ExperienceWrapper>
  );
};

export default Experience;
