import lang from 'common/lang';
import NoJobIconImg from 'components/Icons/NoJob';
import { createJob } from 'common/utils/network/appRouts';
import {
  AddFirstJobText,
  AddJobButton,
  NoJobIcon,
  NoJobText,
  NoJobWrapper,
} from 'pages/workspace/common/styles';
import useCompany from 'common/hooks/useCompany';
import { useNavigate } from 'common/utils/router-fill';

const {
  workspace: { noJob, addFirstJob, addJob },
} = lang;

const NoJob = () => {
  const { currentCompany } = useCompany();
  const navigate = useNavigate();
  return (
    <NoJobWrapper>
      <NoJobIcon data-cy="no-job-icon">
        <NoJobIconImg />
      </NoJobIcon>
      <NoJobText data-cy="no-job-title">{noJob}</NoJobText>
      <AddFirstJobText data-cy="no-job-subtitle">{addFirstJob}</AddFirstJobText>
      {currentCompany && (
        <AddJobButton
          data-cy="addJobFromNoJob"
          onClick={() => navigate(createJob)}
        >
          {addJob}
        </AddJobButton>
      )}
    </NoJobWrapper>
  );
};

export default NoJob;
