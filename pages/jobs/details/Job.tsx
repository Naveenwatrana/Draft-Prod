import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import lang from 'common/lang';
import { IconWrapper } from 'components/Atoms/IconWrapper';
import SaveContent from 'components/Icons/SaveContent';
import { Container as LayoutContainer, LeftContainer, MainContainer } from 'components/Molecules/LayoutSplit/styles';
import {
  formatNumberToCurrency,
  formateJobDetailData,
} from 'common/utils/helpers';
import { selectCurrentCompany, selectCurrentUser } from 'pages/account/authSlice';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import useAladdinInteraction from 'common/services/Aladdin/useAladdinInteraction';
import {
  EditHighLightButton,
  JobDetailAction,
  JobDetailSection,
  JobDetailSectionSubTitle,
  JobDetailSectionTitle,
  DividerComp,
  PublishButton,
  FilledButtonIcon,
  JobHeighlight,
  HeighlightIcon,
  HeighlightValues,
  HeighlightTag,
  ActionContainer,
  RatingTag,
  BackButtonWrapper,
} from 'pages/jobs/details/styles';
import {
  IInteractionEventValueType, IInteractionItemTypes, IInteractionTypes, ISaveInteractionPayload,
} from 'common/services/Aladdin/types';
import { loginUrl } from 'common/utils/network/appRouts';
import { useNavigate } from 'common/utils/router-fill';
import { useIsMobile } from 'common/hooks/useIsMobile';
import JobActionBar from 'components/Molecules/ActionBar/JobActionBar';
import Loader from 'components/Loader/Loader';
import { formatDate } from 'common/utils/date/dateFormat';
import { ARTICLE_DATE_FORMAT } from 'common/constants';
import { PlaceHolderText } from 'pages/workspace/common/jobApplicationsDesktop/styles';
import ShareIcon from 'components/Icons/JobIcons/share.svg';
import BriefcaseIcon from 'components/Icons/JobIcons/briefcase.svg';
import CashIcon from 'components/Icons/JobIcons/cash.svg';
import SkillIcon from 'components/Icons/JobIcons/skills.svg';
import LocationIcon from 'components/Icons/JobIcons/location.svg';
import BuildingIcon from 'components/Icons/JobIcons/building.svg';
import UserIcon from 'components/Icons/JobIcons/user.svg';
import GlobeIcon from 'components/Icons/JobIcons/globe.svg';
import RatingIcon from 'components/Icons/JobIcons/rating.svg';
import NavbarCompact from 'components/Molecules/JobNavbarCompact';
import { useRouter } from 'next/router';
import { useLoggedInUser } from 'common/hooks/useLoggedInUser';
import { useSaveContent } from 'common/hooks/useSaveContent';
import { PINS_TYPES } from 'common/types';
import ChevronLeft from 'components/Icons/LeftChevron';
import EditJob from 'components/EditJob';
import { EDIT_JOB_VIEW_TYPE } from 'components/EditJob/types';
import DeleteJobConfirm from 'components/EditJob/DeleteJobConfirm';
import { JobStatus } from '../../workspace/type';
import { useApplyJobMutation, useEditJobMutation, useDeleteJobMutation } from '../jobsService';
import { JobDetailData, JobPageProps } from './types';
import { cleanObject, formatCloseJobPayload, getSkillsNotMatched } from './utils';
import CloseConfirmation from '../components/Modal/CloseConfirmation';
import { ICloseJobModalValues } from '../components/Modal/types';
import CompanyBlock from '../components/CompanyBlock';
import InfoListBlock from '../components/InfoListBlock';
import NoRequirements from '../components/NoRequirements';
import NoResponsibilities from '../components/NoResponsibilities';

const { jobs } = lang;
const {
  moreMenu, publishUnpublishMsg, applyMsg, createJobSteps,
} = jobs;

const JobDetail = ({
  jobData, loggedInUser, isAuthor, view, slug,
}: JobPageProps) => {
  const [, setSkip] = useState(true);
  const navigate = useNavigate();
  const router = useRouter();
  const companyData = jobData?.company;
  const currentUser = useSelector(selectCurrentUser) || loggedInUser;
  const currentCompany = useSelector(selectCurrentCompany);
  const [applyJob] = useApplyJobMutation();
  const [editJob, editJobResult] = useEditJobMutation();
  const [deleteJob, deleteJobResult] = useDeleteJobMutation();

  const [jobDetailData, setJobDetailData] = useState<JobDetailData>(formateJobDetailData(jobData));
  const [saved, setSaved] = useState<boolean>(jobDetailData?.saved || false);

  const isMobile = useIsMobile();
  const isUserLoggedIn = useLoggedInUser();
  const { saveContent } = useSaveContent();
  const id = jobDetailData?.id;
  const applied = useMemo(() => jobData?.applied, [currentUser?.id, jobData?.applied]);

  const isUserB2B = currentCompany?.id === companyData?.id;
  const skillNotMatched: string[] = getSkillsNotMatched(jobDetailData?.matchingSkills, jobDetailData?.skills);
  const isJobPublished = jobDetailData?.status === 'Published';

  const isButtonSecondary = isJobPublished || (applied && !isUserB2B);

  const applyAppliedLabel = useMemo(() => jobDetailData?.applied ? jobs.applied : jobs.apply, [currentUser?.id, jobDetailData?.applied]);

  const { saveInteraction } = useAladdinInteraction();
  const handleApply = () => {
    if (!loggedInUser) {
      navigate(loginUrl);
      return;
    }
    // Aladdin interaction event
    saveInteraction({
      itemId: jobDetailData.id,
      itemType: IInteractionItemTypes.jobs,
      eventType: IInteractionTypes.apply,
      eventValue: IInteractionEventValueType.brandTab,
    });
    // Aladdin interaction event
    applyJob(jobDetailData.id).unwrap().then(() => {
      showNotification(applyMsg, NotificationType.SUCCESS);
      setJobDetailData({ ...jobDetailData, applied: true });
    }).catch((error: any) => {
      showNotification(error?.data?.message, NotificationType.ERROR);
    });

    const eventDetail: ISaveInteractionPayload = {
      itemId: jobDetailData.id as string,
      itemType: IInteractionItemTypes.jobs,
      eventType: IInteractionTypes.apply,
    };
    (eventDetail);
  };
  useEffect(() => {
    if (jobData.id) {
      saveInteraction({
        itemId: jobData.id,
        itemType: IInteractionItemTypes.jobs,
        eventType: IInteractionTypes.ViewPage,
        eventValue: IInteractionEventValueType.brandTab,
      });
    }
  }, [
    jobData.id]);

  const saveJob = async () => {
    setSkip(false);
    if (!isUserLoggedIn) {
      navigate(loginUrl);
      return;
    }
    // Aladdin interaction event
    saveInteraction({
      itemId: id,
      itemType: IInteractionItemTypes.jobs,
      eventType: IInteractionTypes.Save,
      eventValue: IInteractionEventValueType.brandTab,
    });
    // Aladdin interaction event
    saveContent(id, PINS_TYPES.JOBS, IInteractionItemTypes.jobs);
    setSaved(!saved);
  };

  const handleOpenCloseJob = (payloadToPass = {}) => {
    const payload = {
      formData: {
        status: jobDetailData?.status === JobStatus.PUBLISHED ? 'close' : 'open',
        ...payloadToPass,
      },
      id: jobDetailData.id,
    };
    editJob(payload).unwrap().then((res) => {
      if (res?.data) {
        setJobDetailData(formateJobDetailData(res.data));
        showNotification(res.data.status === JobStatus.PUBLISHED ? publishUnpublishMsg.publishMsg : publishUnpublishMsg.unPublishMsg, NotificationType.SUCCESS);
      }
    }).catch((error: any) => {
      showNotification(error?.data?.message, NotificationType.ERROR);
    }).finally(() => setModalOpen(false));
  };

  const handleDeleteJob = () => {
    deleteJob(id).unwrap().then((res) => {
      if (res.status === 'Success') {
        showNotification(publishUnpublishMsg.deleteMsg, NotificationType.SUCCESS);
        router.back();
      }
    });
  };

  const handleJobEdit = (job:JobDetailData) => {
    let jobRequest = {};
    jobRequest = {
      title: job.title,
      role_id: job.role.id,
      employment_type: job?.employmentType?.value,
      location_type: job?.locationType,
      salary_to: job.salaryTo || null,
      gross_salary_from: job.oteFrom || null,
      gross_salary_to: job.oteTo || null,
      tag_ids: job?.skills?.map((skill) => {
        return {
          tag_id: parseInt(skill.id),
          importance_scale: skill.pivot?.importance_scale || 4,
        };
      }),
      role_type: job?.roleType?.value,
      location: job?.location?.value,
      office_days_per_week: job?.officeDaysPerWeekType?.value,
      language_tag_ids: job?.languages?.map((language) => parseInt(language.value)) || [],
      requirements: job.requirements,
      responsibilities: job.responsibilities,
    };

    jobRequest = {
      ...cleanObject(jobRequest),
      salary_from: job.salaryFrom,
      total_people_managed: job?.range?.value || null,
      office_days_from: job?.minimumDays?.value || null,
      office_days_to: job?.maximumDays?.value || null,
    };

    const payload = {
      formData: jobRequest,
      id: jobDetailData.id,
    };
    editJob(payload).unwrap().then((res) => {
      if (res?.data) {
        if (res.data.slug !== slug) {
          router.push(`/${res.data.slug}`);
        } else {
          showNotification('Job Updated Successfully', NotificationType.SUCCESS);
        }
        setJobDetailData(formateJobDetailData(res.data));
        setEditOpen(false);
        setWhoYoAreOpen(false);
        setWhatWillYouDoOpen(false);
      }
    }).catch((error: any) => {
      showNotification(error?.data?.message, NotificationType.ERROR);
    }).finally(() => setModalOpen(false));
  };

  const handleCloseJob = (values: ICloseJobModalValues) => handleOpenCloseJob(formatCloseJobPayload(values));
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [whoYouAreOpen, setWhoYoAreOpen] = useState<boolean>(false);
  const [whatWillYouDoOpen, setWhatWillYouDoOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const jobClosed = jobDetailData?.status === JobStatus.UNPUBLISHED;
  const isHaveRequirements = jobData.requirements.length > 0;
  const copyJobLink = () => {
    saveInteraction({
      itemId: jobData.id,
      itemType: IInteractionItemTypes.jobs,
      eventType: IInteractionTypes.share,
      eventValue: IInteractionEventValueType.brandTab,
    });
    navigator.clipboard.writeText(window.location.href);
    showNotification('Link Copied', NotificationType.SUCCESS);
  };
  const isEndUser = !isAuthor && currentCompany === null;
  return (
    <>
      {isAuthor && (
        <NavbarCompact
          step={1}
          stepsToRender={[]}
          title={jobDetailData.title || jobDetailData?.role?.name}
          onBack={() => router.back()}
          isAuthor={isUserB2B}
          view={view}
          slug={slug}
          jobData={jobData}
          onJobClose={() => setModalOpen(true)}
          onJobOpen={() => handleOpenCloseJob()}
          status={jobDetailData?.status}
          deleteJob={() => setDeleteOpen(true)}
        />
      )}
      <BackButtonWrapper>
        <IconWrapper onClick={() => router.back()}>
          <ChevronLeft data-cy="goBack" />
        </IconWrapper>
      </BackButtonWrapper>
      {(editJobResult.isLoading) && <Loader />}
      <LayoutContainer isMobile={isMobile} isAuthor={isAuthor}>
        <LeftContainer isMobile={isMobile}>
          <JobDetailSection>
            {isEndUser && (
              <RatingTag>
                <RatingIcon />
                {`${jobData?.match_score}% Match`}
              </RatingTag>
            )}
            <JobDetailSectionTitle>{jobDetailData.title || jobDetailData.role?.name}</JobDetailSectionTitle>
            <JobDetailSectionSubTitle>{`Posted on ${formatDate(jobData.created_at, ARTICLE_DATE_FORMAT)}`}</JobDetailSectionSubTitle>
            <JobDetailAction>
              {isAuthor && <EditHighLightButton disabled={jobDetailData.status === JobStatus.PUBLISHED} onClick={() => setEditOpen(true)}>Edit snapshot</EditHighLightButton>}
              {!isUserB2B && currentCompany === null && !jobClosed && <PublishButton primary={!isButtonSecondary} fullWidth label={applyAppliedLabel} disabled={jobDetailData?.applied} onClick={handleApply} type="submit" data-cy={`${applyAppliedLabel}Job`} />}
              {!isAuthor && (
                <IconWrapper data-cy="saveUserProfile" onClick={saveJob}>
                  <SaveContent active={saved} />
                </IconWrapper>
              )}
              <FilledButtonIcon onClick={copyJobLink} data-cy="shareLinkButton">
                <ShareIcon />
              </FilledButtonIcon>
            </JobDetailAction>
            <DividerComp />
            <JobHeighlight>
              <HeighlightIcon>
                <BriefcaseIcon />
              </HeighlightIcon>
              <HeighlightValues>
                <HeighlightTag isActive={isEndUser && jobDetailData.matchedWhoYouAre.includes('employmentType')}>{jobDetailData?.employmentType?.label}</HeighlightTag>
              </HeighlightValues>
            </JobHeighlight>
            <JobHeighlight>
              <HeighlightIcon>
                <CashIcon />
              </HeighlightIcon>
              <HeighlightValues>
                <HeighlightTag isActive={isEndUser && jobDetailData.matchedWhoYouAre.includes('salaryFrom')}>{`${formatNumberToCurrency(jobDetailData?.salaryFrom)} ${jobDetailData?.salaryTo ? `- ${formatNumberToCurrency(jobDetailData?.salaryTo)}` : ''}`}</HeighlightTag>
              </HeighlightValues>
            </JobHeighlight>
            <JobHeighlight>
              <HeighlightIcon>
                <SkillIcon />
              </HeighlightIcon>
              {jobDetailData.skills.length > 0 ? (
                <HeighlightValues>
                  {isEndUser && jobDetailData.matchingSkills.map((skill) => {
                    return <HeighlightTag isActive={isEndUser} key={skill.tag}>{skill.tag}</HeighlightTag>;
                  })}
                  {isEndUser && skillNotMatched.map((skill) => {
                    return <HeighlightTag key={skill}>{skill}</HeighlightTag>;
                  })}
                  {!isEndUser && jobDetailData.skills.map((skill) => {
                    return <HeighlightTag key={skill.tag}>{skill.tag}</HeighlightTag>;
                  })}
                </HeighlightValues>
              ) : (<PlaceHolderText>Confirm skills & technologies</PlaceHolderText>)}
            </JobHeighlight>
            <JobHeighlight>
              <HeighlightIcon>
                <LocationIcon />
              </HeighlightIcon>
              <HeighlightValues>
                {jobDetailData?.locationType ? <HeighlightTag isActive={isEndUser && jobDetailData.matchedWhatWillYouDo.includes('workStyle')}>{jobDetailData?.locationType}</HeighlightTag>
                  : (
                    <PlaceHolderText>
                      Confirm work style
                      <br />
                    </PlaceHolderText>
                  )}
                <HeighlightTag isActive={isEndUser && jobDetailData.matchedWhatWillYouDo.includes('location')}>{jobDetailData?.location?.label || jobData.location}</HeighlightTag>
              </HeighlightValues>
            </JobHeighlight>
            {jobDetailData?.locationType === 'Hybrid' && jobDetailData.minimumDays && jobDetailData.maximumDays && (
              <JobHeighlight>
                <HeighlightIcon>
                  <BuildingIcon />
                </HeighlightIcon>
                <HeighlightValues>
                  <HeighlightTag isActive={isEndUser && jobDetailData.matchedWhatWillYouDo.includes('workStyle')}>{`${jobDetailData.minimumDays?.value}-${jobDetailData.maximumDays?.value} days a week in office`}</HeighlightTag>
                </HeighlightValues>
              </JobHeighlight>
            )}
            {jobDetailData?.locationType === 'Hybrid' && jobDetailData.officeDaysPerWeekType?.label === 'Occasionally' && (
              <JobHeighlight>
                <HeighlightIcon>
                  <BuildingIcon />
                </HeighlightIcon>
                <HeighlightValues>
                  <HeighlightTag isActive={isEndUser && jobDetailData.matchedWhatWillYouDo.includes('workStyle')}>Occasionally in the office</HeighlightTag>
                </HeighlightValues>
              </JobHeighlight>
            )}
            <JobHeighlight>
              <HeighlightIcon>
                <UserIcon />
              </HeighlightIcon>
              <HeighlightValues>
                <HeighlightTag isActive={isEndUser && jobDetailData.matchedWhatWillYouDo.includes('roleType')}>{jobDetailData.roleType?.label}</HeighlightTag>
                {jobDetailData?.range?.label && <HeighlightTag isActive={isEndUser && jobDetailData.matchedWhatWillYouDo.includes('range')}>{jobDetailData.range?.label.replace('-', ' - ')}</HeighlightTag>}
              </HeighlightValues>
            </JobHeighlight>
            {jobDetailData.languages.length > 0 && (
              <JobHeighlight>
                <HeighlightIcon>
                  <GlobeIcon />
                </HeighlightIcon>
                <HeighlightValues>
                  {jobDetailData.languages.map((language) => {
                    return <HeighlightTag isActive={isEndUser && jobDetailData.languageMatched.includes(language.label)} key={language.value}>{language.label}</HeighlightTag>;
                  })}
                </HeighlightValues>
              </JobHeighlight>
            )}
          </JobDetailSection>
        </LeftContainer>
        <MainContainer>
          <CompanyBlock jobData={jobData} isAuthor={isUserB2B} loggedInUser={loggedInUser} />
          {isHaveRequirements && (
            <InfoListBlock
              isAuthor={isUserB2B && jobDetailData.status !== JobStatus.PUBLISHED}
              onClick={() => { isUserB2B && jobDetailData.status !== JobStatus.PUBLISHED && setWhoYoAreOpen(true); }}
              title={createJobSteps.details.whoYouArePopup.heading}
              list={jobDetailData.requirements}
            />
          )}
          {!isHaveRequirements && isAuthor && <NoRequirements onClick={() => { setWhoYoAreOpen(true); }} />}
          {isHaveRequirements && (
            <InfoListBlock
              isAuthor={isUserB2B && jobDetailData.status !== JobStatus.PUBLISHED}
              onClick={() => { isUserB2B && jobDetailData.status !== JobStatus.PUBLISHED && setWhatWillYouDoOpen(true); }}
              title={createJobSteps.details.whatWillYouDoPopup.title}
              list={jobDetailData.responsibilities}
            />
          )}
          {!isHaveRequirements && isAuthor && <NoResponsibilities onClick={() => { setWhatWillYouDoOpen(true); }} />}
          {isAuthor && (
            <ActionContainer>
              <JobActionBar
                isAuthor={isUserB2B}
                jobSavedStatus={jobDetailData?.saved}
                id={jobDetailData?.id}
                setSkip={() => setSkip(false)}
                isJobOpen={jobDetailData?.status === JobStatus.PUBLISHED}
              >
                {!isUserB2B && currentCompany === null && !jobClosed && <PublishButton primary={!isButtonSecondary} fullWidth label={applyAppliedLabel} disabled={jobDetailData?.applied} onClick={handleApply} type="submit" data-cy={`${applyAppliedLabel}Job`} />}
              </JobActionBar>
            </ActionContainer>
          )}
        </MainContainer>
      </LayoutContainer>
      {modalOpen && <CloseConfirmation onClose={() => setModalOpen(false)} onSubmit={handleCloseJob} jobId={jobDetailData.id} />}
      {isAuthor && editOpen && <EditJob onClose={() => setEditOpen(false)} handleJobEdit={handleJobEdit} jobDetailData={jobDetailData} />}
      {isAuthor && whoYouAreOpen && (
        <EditJob
          dataView={EDIT_JOB_VIEW_TYPE.WHOYOUARE}
          onClose={() => setWhoYoAreOpen(false)}
          handleJobEdit={handleJobEdit}
          jobDetailData={jobDetailData}
        />
      )}
      {isAuthor && whatWillYouDoOpen && (
        <EditJob
          dataView={EDIT_JOB_VIEW_TYPE.WHATWILLYOUDO}
          onClose={() => setWhatWillYouDoOpen(false)}
          handleJobEdit={handleJobEdit}
          jobDetailData={jobDetailData}
        />
      )}
      {isAuthor && whatWillYouDoOpen && (
        <EditJob
          dataView={EDIT_JOB_VIEW_TYPE.WHATWILLYOUDO}
          onClose={() => setWhatWillYouDoOpen(false)}
          handleJobEdit={handleJobEdit}
          jobDetailData={jobDetailData}
        />
      )}
      {isAuthor && deleteOpen && (
        <DeleteJobConfirm
          onClose={() => setDeleteOpen(false)}
          handleJobDelete={handleDeleteJob}
        />
      )}
    </>
  );
};

export default JobDetail;
