import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import lang from 'common/lang';
import {
  formateJobDetailData,
} from 'common/utils/helpers';
import { IApplicant, IFeedData, IRecommendation } from 'pages/feed/types';
import { selectCurrentCompany } from 'pages/account/authSlice';
import { useNavigate } from 'common/utils/router-fill';
import Loader from 'components/Loader/Loader';
import TextComp from 'components/textComp';
import {
  useJobApplicantsListQuery, useShortListApplicantMutation,
} from 'pages/jobs/jobsService';
import {
  ApplicationFilter, JobDetailData, JobPageProps,
} from 'pages/jobs/details/types';
import {
  GotoMessage, JobApplicationFooter, MatchScoreRow, Score, SearchJobsButton,
} from 'pages/workspace/common/jobApplicationsDesktop/styles';
import NoJobIcon from 'components/Icons/noJob.svg';
import { formatDate } from 'common/utils/date/dateFormat';
import { dateFormatDoM } from 'common/constants';
import BlankFire from 'components/Icons/BlankFire.svg';
import FilledFire from 'components/Icons/FilledFire.svg';
import UserCards from 'pages/feed/Cards/UserCards';
import InfiniteScrollComponent from 'components/InfiniteScroll/InfiniteScroll';
import { JOB_VIEW_TYPE } from 'common/types';
import { jobMatchScore } from 'common/utils/jobMatchScore';
import { StyledDivider, VerticleDividerComp } from 'components/Divider/styles';
import FilterIcon from 'components/Icons/filter';
import {
  ApplicationSearchContainer, ApplicationsCrossIcon, Avatar, InputSearchIcon,
} from 'components/NavBar/styles';
import RecommendationInfoCard from 'pages/jobs/components/RecommendationInfoCard';
import { userProfileUrl } from 'common/utils/network/appRouts';
import {
  ApplicationsWrapper, IconWrapper, NoApplicationsData, NoApplicationsText, ApplicationListWrapper, JobApplicantesList,
  CardContainer, UserInfo, UserInfoCount, JobSkills, JobSkillsCount, JobMatchingSkillsCount, ViewJobButton, UserSkillsContiner,
  Divider, SkillsTopContiner, StatusRow, StatusText, LitCandidate, FilterContainer, QuickFilterContainer, QuickFilterOption,
  RecommendationSearchInput, ResCardContainer, MantraText, ShortListElement, UserDetail, UserLocation, UserName, UserText,
} from '../styles';
import ApplicationFilters from '../../components/ApplicationFilters';
import ApplicationsInfoCard from '../../components/ApplicationsInfoCard';

const { jobs } = lang;
const {
  applicants,
} = jobs;

const ApplicantsList = ({ jobData, slug }: JobPageProps) => {
  const navigate = useNavigate();
  const currentCompany = useSelector(selectCurrentCompany);
  const [currentApplicationPage] = useState(0);
  const [shortListApplicant, shortListApplicantResult] = useShortListApplicantMutation();
  const [filters, setFilters] = useState<ApplicationFilter>({
    search: '', skills: [], isRecommended: false, isMessaged: false,
  });
  const [jobDetailData] = useState<JobDetailData>(formateJobDetailData(jobData));
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilters({ ...filters, search: searchTerm });
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);
  const dataObject = {
    id: jobDetailData?.id,
    company: currentCompany?.username,
    page: currentApplicationPage + 1,
    search: filters.search,
    shortlisted: filters.isSortListed,
    skill: selectedSkills.join(','),
    messaged: filters.isMessaged,
  };
  const { data, isLoading } = useJobApplicantsListQuery(dataObject);
  if (isLoading) {
    return <Loader fullScreen={true} />;
  }
  let { data: applicationsData } = data.data;

  if (!jobDetailData.applicantsCount || jobDetailData.applicantsCount === 0) {
    return (
      <NoApplicationsData>
        <NoApplicationsText>
          <IconWrapper>
            <NoJobIcon />
          </IconWrapper>
          <TextComp component="h2">{applicants.noApplicants.title}</TextComp>
          <IconWrapper />
          <TextComp style={{ lineHeight: '20px', fontSize: 16 }} component="paragraph">
            {applicants.noApplicants.discription}
          </TextComp>
          <SearchJobsButton onClick={() => { return false; }} label={applicants.noApplicants.startSourcing} primary />
        </NoApplicationsText>
      </NoApplicationsData>
    );
  }
  const shortListTheApplicant = async (applicantId: number, index: number) => {
    await shortListApplicant(applicantId);
    const applications = [...applicationsData];
    applications[index].is_shortlisted = !applications[index].is_shortlisted;
    applicationsData = [...applications];
  };

  return (
    <ApplicationsWrapper>
      {(data.isLoading || shortListApplicantResult.isLoading) && <Loader fullScreen={true} />}
      {/* <ApplicationFilters
        skills={jobDetailData?.categorySkills}
        setSkills={(skill) => setSelectedSkills(skill)}
        updateFilter={(filter) => { setFilters({ ...filter }); }}
      /> */}
      <ApplicationListWrapper>
        <FilterContainer>
          <QuickFilterContainer>
            <QuickFilterOption onClick={() => { setFilters({ ...filters, isSortListed: !filters.isSortListed }); }} isActive={filters.isSortListed || false}>
              Shortlisted
            </QuickFilterOption>
            <QuickFilterOption onClick={() => { setFilters({ ...filters, isMessaged: !filters.isMessaged }); }} isActive={filters.isMessaged || false}>
              Messaged
            </QuickFilterOption>
            <VerticleDividerComp />
            <QuickFilterOption isActive={false}>
              <FilterIcon active={true} />
              More filters
            </QuickFilterOption>
          </QuickFilterContainer>
          <ApplicationSearchContainer>
            <RecommendationSearchInput
              placeholder="Search candidate name"
              value={searchTerm || ''}
              onChange={(e) => { setSearchTerm(e.target.value); }}
              autoFocus={false}
            />
            <InputSearchIcon size={25} />
            {searchTerm && <ApplicationsCrossIcon size={14} onClick={() => { setSearchTerm(''); }} />}
          </ApplicationSearchContainer>
        </FilterContainer>
        <InfiniteScrollComponent
          data={applicationsData}
          fetchMoreData={() => { return false; }}
          hasMore={false}
          scrollableTarget="infinite-scroll"
          showLoader={false}
        >
          <JobApplicantesList>
            {applicationsData.length > 0 && <RecommendationInfoCard />}
            {applicationsData?.map((application: IRecommendation, index: number) => {
              return (
                <ResCardContainer key={application.user.id} shortlisted={application.is_shortlisted} onClick={() => { navigate(userProfileUrl(application.user.username)); }}>
                  <ShortListElement>
                    <LitCandidate onClick={(e) => { e.stopPropagation(); application.id && shortListTheApplicant(application.id, index); }}>
                      {application.is_shortlisted ? <FilledFire /> : <BlankFire />}
                    </LitCandidate>
                  </ShortListElement>

                  <UserInfo>
                    <UserDetail>
                      <Avatar
                        rectangle={false}
                        url={application.user.profile_image}
                        size={80}
                      >
                        {!application.user.profile_image && (application.user.name?.charAt(0) || application.user.username?.charAt(0) || '?')}
                      </Avatar>
                      <UserText>
                        <UserName>{application.user?.name || application.user.username}</UserName>
                        <UserLocation>{`${application.user?.location || '-'}`}</UserLocation>
                      </UserText>
                      <MantraText>
                        {application.user?.mantra}
                      </MantraText>
                    </UserDetail>
                  </UserInfo>
                  <JobApplicationFooter>
                    <MatchScoreRow>
                      Match score
                      <Score>{`${application.match_score}%`}</Score>
                    </MatchScoreRow>
                    <StyledDivider />
                    <MatchScoreRow>
                      Skills
                      <JobSkills>
                        <JobSkillsCount>
                          <JobMatchingSkillsCount>{application.user_matched_skills_count || 0}</JobMatchingSkillsCount>
                          /
                          {jobDetailData.skills?.length}
                        </JobSkillsCount>
                      </JobSkills>
                    </MatchScoreRow>
                    <StyledDivider />
                    <MatchScoreRow>
                      Messages
                      <GotoMessage onClick={(e) => { e.stopPropagation(); navigate(`/${slug}/${JOB_VIEW_TYPE.MESSAGES}/pro/${application.user?.username}`); }}>View messages</GotoMessage>
                    </MatchScoreRow>
                    <StyledDivider />
                    <MatchScoreRow>
                      Past applications
                      <span>{application.past_application_count || 0}</span>
                    </MatchScoreRow>
                  </JobApplicationFooter>
                </ResCardContainer>
              );
            })}
          </JobApplicantesList>
        </InfiniteScrollComponent>
      </ApplicationListWrapper>
    </ApplicationsWrapper>
  );
};

export default ApplicantsList;
