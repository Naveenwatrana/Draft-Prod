import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import lang from 'common/lang';
import {
  formateJobDetailData,
} from 'common/utils/helpers';
import { IRecommendation } from 'pages/feed/types';
import { selectCurrentCompany } from 'pages/account/authSlice';
import { useNavigate } from 'common/utils/router-fill';
import Loader from 'components/Loader/Loader';
import TextComp from 'components/textComp';
import {
  useJobRecommendationsListMutation, useShortListApplicantMutation,
} from 'pages/jobs/jobsService';
import BlankFire from 'components/Icons/BlankFire.svg';
import FilledFire from 'components/Icons/FilledFire.svg';
import FilterIcon from 'components/Icons/filter';
import {
  ApplicationFilter, JobDetailData, JobPageProps,
} from 'pages/jobs/details/types';
import {
  GotoMessage, JobApplicationFooter, MatchScoreRow, Score, SearchJobsButton,
} from 'pages/workspace/common/jobApplicationsDesktop/styles';
import NoJobIcon from 'components/Icons/noJob.svg';
import InfiniteScrollComponent from 'components/InfiniteScroll/InfiniteScroll';
import {
  ApplicationSearchContainer, ApplicationsCrossIcon, Avatar, InputSearchIcon,
} from 'components/NavBar/styles';
import { StyledDivider, VerticleDividerComp } from 'components/Divider/styles';
import { JOB_VIEW_TYPE } from 'common/types';
import { userProfileUrl } from 'common/utils/network/appRouts';
import {
  ApplicationsWrapper, IconWrapper, NoApplicationsData, NoApplicationsText, RecommendationWrapper, JobApplicantesList,
  CardContainer, UserInfo, JobSkills, JobSkillsCount, JobMatchingSkillsCount, UserDetail, UserText, UserName, UserLocation,
  MantraText, LitCandidate, ShortListElement, ResCardContainer, FilterContainer, QuickFilterContainer, QuickFilterOption, RecommendationSearchInput,
} from '../styles';
import RecommendationInfoCard from '../../components/RecommendationInfoCard';

const { jobs } = lang;
const {
  applicants,
} = jobs;

const Recommendations = ({ jobData, slug }: JobPageProps) => {
  const navigate = useNavigate();
  const currentCompany = useSelector(selectCurrentCompany);
  const [applicationsData, setApplicationsData] = useState<IRecommendation[]>([]);
  const [currentApplicationPage, setCurrentApplicationPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [shortListApplicant, shortListApplicantResult] = useShortListApplicantMutation();
  const [filters, setFilters] = useState<ApplicationFilter>({
    search: '', skills: [], isSortListed: false, isApplied: false, isMessaged: false,
  });
  const [jobDetailData] = useState<JobDetailData>(formateJobDetailData(jobData));
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [getRecommendation, result] = useJobRecommendationsListMutation();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFilters({ ...filters, search: searchTerm });
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    if (currentApplicationPage === 1) {
      const dataObject = {
        id: jobDetailData?.id,
        company: currentCompany?.username,
        page: currentApplicationPage,
        search: filters.search,
        shortlisted: filters.isSortListed,
        applied: filters.isApplied,
        messaged: filters.isMessaged,
        skill: selectedSkills.join(','),
      };
      getRecommendation(dataObject).unwrap()
        .then((res) => {
          setApplicationsData(res.data.data);
          setTotalPages(res.data.last_page);
        });
    } else {
      setCurrentApplicationPage(1);
    }
  }, [filters]);

  useEffect(() => {
    const dataObject = {
      id: jobDetailData?.id,
      company: currentCompany?.username,
      page: currentApplicationPage,
      search: filters.search,
      shortlisted: filters.isSortListed,
      skill: selectedSkills.join(','),
    };
    getRecommendation(dataObject).unwrap()
      .then((res) => {
        if (currentApplicationPage === 1) {
          setApplicationsData(res.data.data);
        } else {
          setApplicationsData(applicationsData.concat(res.data.data));
        }
        setTotalPages(res.data.last_page);
      });
  }, [currentApplicationPage]);
  const shortListTheApplicant = async (applicantId: string) => {
    await shortListApplicant(applicantId);
  };
  return (
    <ApplicationsWrapper>
      {(result.isLoading) && <Loader fullScreen={true} />}
      <RecommendationWrapper>
        <FilterContainer>
          <QuickFilterContainer>
            <QuickFilterOption onClick={() => { setFilters({ ...filters, isApplied: !filters.isApplied }); }} isActive={filters.isApplied || false}>
              Applied to job
            </QuickFilterOption>
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
        <StyledDivider />
        <InfiniteScrollComponent
          data={applicationsData}
          fetchMoreData={() => { setCurrentApplicationPage(currentApplicationPage + 1); }}
          hasMore={currentApplicationPage < totalPages}
          scrollableTarget="infinite-scroll"
          showLoader={false}
        >
          <JobApplicantesList>
            {applicationsData.length === 0 && (
              <NoApplicationsData>
                <NoApplicationsText>
                  <IconWrapper>
                    <NoJobIcon />
                  </IconWrapper>
                  <TextComp component="h2">{applicants.noRecmmendation.title}</TextComp>
                  <IconWrapper />
                  <TextComp style={{ lineHeight: '20px', fontSize: 16 }} component="paragraph">
                    {applicants.noRecmmendation.discription}
                  </TextComp>
                  <SearchJobsButton onClick={() => { return false; }} label={applicants.noRecmmendation.startSourcing} primary />
                </NoApplicationsText>
              </NoApplicationsData>
            )}
            {applicationsData.length > 0 && <RecommendationInfoCard />}
            {applicationsData?.map((application: IRecommendation) => {
              return (
                <ResCardContainer key={application.user.id} shortlisted={application.is_shortlisted} onClick={() => { navigate(userProfileUrl(application.user.username)); }}>
                  <ShortListElement>
                    <LitCandidate onClick={(e) => { e.stopPropagation(); application.user.id && shortListTheApplicant(application.user.id.toString()); }}>
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
      </RecommendationWrapper>
    </ApplicationsWrapper>
  );
};

export default Recommendations;
