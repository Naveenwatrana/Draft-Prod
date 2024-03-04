import ResumeSectionTitle from 'components/Molecules/ResumeSectionTitle';
import ModalElement from 'components/Modal/Modal';
import { useLoggedInUser } from 'common/hooks/useLoggedInUser';
import lang from 'common/lang';
import { useState } from 'react';
import EmptyResumeContent from 'components/Molecules/EmptyResumeContent';
import { ResumeDetailsContainer } from './style';
import WorkExperience from '../components/WorkExperience';
import { ModalType } from '../Tabs/types';
import { IExperienceData } from '../components/WorkExperience/type';
import SideProject from '../components/Projects/SideProject';
import { ISideProjectData } from '../components/Projects/SideProject/Edit/types';
import Education from '../components/Education';
import { IEducation } from '../components/Education/types';
import EditProjects from '../components/Projects/SideProject/Edit';
import WorkExperienceModal from '../components/WorkExperience/modal';
import AddEducationForm from '../components/Education/AddEducation/Form';
import { ResumeContentProps } from './types';

const { resume, sideProject } = lang.projects;
const { add } = sideProject;
const { workExperience, sideProjects } = resume;

const ResumeContent = ({
  resumeData, ownProfile, workExperienceData, projectsData, educationData, isLoading, setSkip,
}: ResumeContentProps) => {
  const LoggedInUser = useLoggedInUser();
  const [modalType, setModalType] = useState(0);
  const [open, setOpen] = useState(false);
  const [education, setEducation] = useState<IEducation>();
  const [experienceData, setExperienceData] = useState<IExperienceData | null>();
  const openProjectModal = (type: number) => {
    setSkip(false);
    setModalType(type);
    setOpen(true);
  };
  const closeProjectModal = () => {
    setOpen(false);
    setExperienceData(null);
  };
  const editExperience = (data: IExperienceData) => {
    setSkip(false);
    setOpen(true);
    setModalType(ModalType.WORK_EXPERIENCE);
    setExperienceData(data);
  };
  const editEducation = (data?: IEducation) => {
    if (data) {
      setSkip(false);
      setOpen(true);
      setModalType(ModalType.EDUCATION);
      setEducation(data);
    }
  };
  const userSideProjects = Object.keys(resumeData?.side_projects || {}).length;
  const isNoExperience = !resumeData?.experience?.length;
  return (
    <>
      <ModalElement isOpen={open} closeModal={closeProjectModal}>
        {modalType === ModalType.PROJECT && (
          <EditProjects
            cancel={closeProjectModal}
            isLoading={isLoading}
          />
        )}
        {modalType === ModalType.WORK_EXPERIENCE && <WorkExperienceModal cancelEdit={closeProjectModal} experienceData={experienceData} />}
        {modalType === ModalType.EDUCATION && <AddEducationForm closeForm={closeProjectModal} data={education} /> }
      </ModalElement>
      <ResumeDetailsContainer>

        {(!resumeData?.experience?.length || workExperienceData.length > 0)
    && (
      <>
        {ownProfile && <ResumeSectionTitle isAddEnable={LoggedInUser} title={workExperience} onClick={() => openProjectModal(ModalType.WORK_EXPERIENCE)} />}
        {ownProfile && (
          <WorkExperience
            ownProfile={ownProfile}
            onAdd={() => openProjectModal(ModalType.WORK_EXPERIENCE)}
            data={workExperienceData}
            isEmpty={isNoExperience}
            onEdit={editExperience}
            onRefetch={() => setSkip(false)}
          />
        )}
        {!ownProfile && !isNoExperience && <ResumeSectionTitle isAddEnable={ownProfile} title={workExperience} onClick={() => openProjectModal(ModalType.WORK_EXPERIENCE)} />}
        {!ownProfile && !isNoExperience && (
          <WorkExperience
            ownProfile={ownProfile}
            onAdd={() => openProjectModal(ModalType.WORK_EXPERIENCE)}
            data={workExperienceData}
            isEmpty={isNoExperience}
            onEdit={editExperience}
          />
        )}
      </>
    )}
        {(!userSideProjects || projectsData.length > 0)
    && (
      <>
        {ownProfile && <ResumeSectionTitle isAddEnable={LoggedInUser} title={sideProjects} onClick={() => openProjectModal(ModalType.PROJECT)} />}
        {!ownProfile && !!userSideProjects && <ResumeSectionTitle isAddEnable={ownProfile} title={sideProjects} onClick={() => openProjectModal(ModalType.PROJECT)} />}
        {!!userSideProjects && projectsData?.map((block: ISideProjectData) => (
          <SideProject
            key={block.id}
            data={block}
            onRefetch={() => setSkip(false)}
            editable={ownProfile}
          />
        ))}
        {ownProfile && !userSideProjects && (
          <EmptyResumeContent
            buttonLabel={add.subtitle}
            description={add.description}
            show
            onClick={() => openProjectModal(ModalType.PROJECT)}
          />
        )}
      </>
    )}
        <Education
          data={educationData}
          onAdd={() => openProjectModal(ModalType.EDUCATION)}
          isEmpty={!resumeData?.education?.length}
          ownProfile={ownProfile}
          update={(status) => setSkip(status)}
          onEdit={(id) => editEducation(educationData?.find((data: any) => data.id === id))}
        />
      </ResumeDetailsContainer>
    </>
  );
};

export default ResumeContent;
