import React from 'react';
import EmptyResumeContent from 'components/Molecules/EmptyResumeContent';
import lang from 'common/lang';
import { useLoggedInUser } from 'common/hooks/useLoggedInUser';
import { IExperienceData, WorkExperienceProps } from './type';
import Experience from './Experience';
import { useDeleteExperienceMutation } from '../../profileService';
import { showNotification } from '../Projects/util';
import { NotificationType } from '../Projects/ViewProject/types';
const { projects: { resume: { add, deleteSuccess } } } = lang;
const WorkExperience = ({
  onAdd, data, isEmpty, onEdit, ownProfile, onRefetch,
}:WorkExperienceProps) => {
  const [deleteExperience] = useDeleteExperienceMutation();
  const loggedInUser = useLoggedInUser();
  const handleDelete = (id:number) => {
    deleteExperience({ id }).unwrap().then(() => showNotification(deleteSuccess, NotificationType.SUCCESS)).catch((error) => {
      showNotification(error?.data?.message, NotificationType.ERROR);
    });
  };
  if (!loggedInUser && isEmpty) return null;

  if (isEmpty) {
    return <EmptyResumeContent buttonLabel={add.subtitle} description={add.description} show onClick={onAdd} />;
  }
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {data?.map((exp: IExperienceData) => (
        <Experience onRefetch={onRefetch} ownProfile={ownProfile} key={exp.id} data={exp} onDelete={() => handleDelete(exp.id)} onEdit={() => onEdit(exp)} />
      )) }
    </>
  );
};

export default WorkExperience;
