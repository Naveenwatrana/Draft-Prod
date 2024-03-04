import {
  MouseEvent, useCallback, useState,
} from 'react';
import {
  ProjectBox, ProjectDetails, ProjectHead, ProjectTitle,
} from 'pages/pro/components/Projects/ViewProject/styles';
import CalenderIcon from 'components/Icons/CalenderIcon';
import { InfoContainer, RoleDescription } from 'pages/pro/components/WorkExperience/Experience/Content/style';
import { ContentContainer, ProjectDuration } from 'pages/pro/components/Projects/SideProject/style';
import { InfoBlock } from 'components/Atoms/InfoBlock';
import { formatDate } from 'common/utils/date/dateFormat';
import lang from 'common/lang';
import { dateFormatMY } from 'common/constants';
import ActionButtons from 'pages/pro/Tabs/ActionButtons';
import { useAppDispatch, useAppSelector } from 'common/hooks/state';
import ModalElement from 'components/Modal/Modal';
import DeleteModal from 'pages/pro/Tabs/DeleteModal';
import { getIsCurrentUser, setIsEditing } from 'pages/pro/profileSlice';
import { useDeleteEducationMutation } from 'pages/pro/profileService';
import MobileActionButtons from 'pages/pro/components/Blocks/MobileActionButtons';
import { useIsMobile } from 'common/hooks/useIsMobile';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import { IEducation } from '../types';
import { EducationInfo } from './styles';
import SkillTags from './SkillTags';

export type ViewEducationProps = {
  data: IEducation[];
  ownProfile: boolean;
  update?: (status: boolean) => void;
  onEdit?: (id: number) => void;
};

const {
  profile: { education: { fields }, block: { delete: { deleteEducation } } },
  projects: { resume: { deleteEducationSuccess } },
} = lang;

const ViewEducation = ({
  data, ownProfile, update, onEdit,
}: ViewEducationProps) => {
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const isCurrentUser = useAppSelector(getIsCurrentUser) || ownProfile;
  const [isBlockEditing, setIsBlockEditing] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleteEducationItem] = useDeleteEducationMutation();
  const handleDelete = (id:number) => {
    if (update) update(false);
    deleteEducationItem({ id }).unwrap().then(() => showNotification(deleteEducationSuccess, NotificationType.SUCCESS)).catch((error) => {
      showNotification(error?.data?.message, NotificationType.ERROR);
    });
    closeDeleteModal();
  };
  const [deletableItem, setDeletableItem] = useState<IEducation | null>();
  const handleDeleteButton = useCallback((education:IEducation) => {
    setDeleteModalOpen(true);
    setDeletableItem(education);
  }, []);
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeletableItem(null);
  };
  const handleClick = (education: IEducation) => {
    if (isMobile && !deleteModalOpen) {
      dispatch(setIsEditing(true));
      setIsBlockEditing(true);
      setDeletableItem(education);
    }
  };

  const closeEditing = useCallback(() => {
    setIsBlockEditing(false);
    dispatch(setIsEditing(false));
  }, [dispatch]);

  const handleDeleteMobile = useCallback((e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (update) update(false);
    closeEditing();
    if (deletableItem) handleDeleteButton(deletableItem);
  }, [closeEditing, deletableItem, handleDeleteButton, update]);
  return (
    <>
      {data.map((education) => {
        const startDate = formatDate(education.start_date, dateFormatMY);
        const endDate = education.end_date && !education.ongoing ? formatDate(education.end_date, dateFormatMY) : 'Now';
        const date = `${startDate} - ${endDate}`;
        return (
          <ProjectHead onClick={() => handleClick(education)} key={education.id}>
            <ProjectBox>
              <ContentContainer>
                {deletableItem?.id === education.id
                && (
                  <ModalElement isOpen={deleteModalOpen} closeModal={closeDeleteModal}>
                    <DeleteModal onClose={closeDeleteModal} onDelete={() => handleDelete(deletableItem.id)} deleteType={deleteEducation} dynamicContent={` ${deletableItem.institution_name} `} />
                  </ModalElement>
                )}
                <ProjectDetails>
                  <ProjectTitle>{education.field_of_study}</ProjectTitle>
                  <ProjectDuration>
                    <CalenderIcon />
                    <p>{date}</p>
                  </ProjectDuration>
                  <EducationInfo>
                    <InfoBlock title={fields.institutionName.label} info={education.institution_name} />
                    <InfoContainer>
                      <InfoBlock title={fields.educationType.label} info={education.education_type} />
                      {education.grade && <InfoBlock title={fields.grade.labelBlock} info={Number(education.grade).toString()} />}
                    </InfoContainer>
                    {education.description && (
                      <RoleDescription>
                        {education.description}
                      </RoleDescription>
                    )}
                    {education.tags.length > 0 && <SkillTags tags={education.tags} />}
                  </EducationInfo>
                </ProjectDetails>
                {isCurrentUser && !isMobile && onEdit && <ActionButtons dataCy="Education" handleDelete={() => handleDeleteButton(education)} handleEdit={() => onEdit(education.id)} />}
                {isCurrentUser && isMobile && onEdit && isBlockEditing && (
                  <MobileActionButtons
                    handleDelete={handleDeleteMobile}
                    handleEdit={() => onEdit(education.id)}
                  />
                )}
              </ContentContainer>
            </ProjectBox>
          </ProjectHead>
        );
      })}
    </>
  );
};

export default ViewEducation;
