import lang from 'common/lang';
import ResumeSectionTitle from 'components/Molecules/ResumeSectionTitle';
import EmptyResumeContent from 'components/Molecules/EmptyResumeContent';
import { useLoggedInUser } from 'common/hooks/useLoggedInUser';
import ViewEducation from './ViewEducation';
import { EducationProps } from './types';

const { education } = lang.profile;

const Education = ({
  data, onAdd, isEmpty, ownProfile, update, onEdit,
}: EducationProps) => {
  const loggedInUser = useLoggedInUser();
  if (!loggedInUser && isEmpty) return null;
  return (
    <>
      {ownProfile && <ResumeSectionTitle title={education.title} onClick={onAdd} isAddEnable={loggedInUser && ownProfile} />}
      {!ownProfile && !isEmpty && <ResumeSectionTitle title={education.title} onClick={onAdd} isAddEnable={loggedInUser && ownProfile} />}
      {ownProfile && isEmpty && (
        <EmptyResumeContent
          buttonLabel={education.addEducationCTA}
          description={education.addEducationText}
          show
          onClick={onAdd}
          data-cy="emptyResumeContent"
        />
      )}
      {!isEmpty && (
        <ViewEducation update={update} data={data} ownProfile={ownProfile} onEdit={onEdit} />
      )}
    </>
  );
};

export default Education;
