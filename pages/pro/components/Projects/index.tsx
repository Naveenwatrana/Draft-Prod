import ModalElement from 'components/Modal/Modal';
import lang from 'common/lang';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useAddProjectMutation, useProjectsQuery } from 'pages/pro/profileService';
import EditProjects from 'pages/pro/components/Projects/EditProject';
import { IProjectValues } from 'pages/pro/components/Projects/types';
import { formatProjectPayload, showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import ViewProject from 'pages/pro/components/Projects/ViewProject/ViewProject';
import { useProjects } from './ViewProject/useProjects';

const { projects } = lang;

const Projects = () => {
  const [editProject, setEditProject] = useState<boolean>(false);
  const { data } = useProjectsQuery('');
  const [addProject, results] = useAddProjectMutation();
  const { saveProjectImages, loading } = useProjects();
  const closeModal = () => {
    setEditProject(false);
  };
  const saveProject: SubmitHandler<IProjectValues> = async (formData) => {
    try {
      const profileImagePath = await saveProjectImages(formData);
      const payload = formatProjectPayload(formData, profileImagePath);
      await addProject(payload).unwrap();
      showNotification(projects.createdSuccess, NotificationType.SUCCESS);
    } catch (e: any) {
      showNotification(projects.createdError, NotificationType.ERROR);
    } finally {
      closeModal();
    }
  };
  const hasProjects = data?.data?.length > 0;
  return (
    <>
      {hasProjects && <ViewProject projects={data?.data} addNewProject={() => setEditProject(true)} />}
      {editProject
      && (
        <ModalElement isOpen={editProject} closeModal={closeModal}>
          <EditProjects
            cancel={closeModal}
            save={saveProject}
            isLoading={results.isLoading || loading}
          />
        </ModalElement>
      )}
    </>
  );
};

export default Projects;
