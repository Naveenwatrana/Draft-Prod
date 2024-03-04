import lang from 'common/lang';
import {
  CardContainer, JobInfoCount, CardHeader, CardDetail,
} from './style';

const { jobs } = lang;

const RecommendationInfoCard = () => {
  return (
    <CardContainer>
      <JobInfoCount>86</JobInfoCount>
      <CardHeader>{jobs.applicants.draftScore}</CardHeader>
      <CardDetail>
        {jobs.applicants.draftScoreSubText}
      </CardDetail>
    </CardContainer>
  );
};

export default RecommendationInfoCard;
