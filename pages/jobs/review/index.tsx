import { useRouter } from 'next/router';
import { useState } from 'react';
import PlaceholderImage from '/public/images/defaultProfile.png';
import lang from 'common/lang';
import { useWindowDimensions } from 'common/hooks';
import ButtonComp from 'components/buttonComp';
import OkThumbs from 'components/Icons/OkThumbs.svg';
import ProfileCard from 'components/ProfileCard';
import JobCard from 'components/cards/JobCard/JobCard';
import JobSnapshotCard from 'components/cards/JobSnapShotCard/JobSnapShotCard';
import Loader from 'components/Loader/Loader';
import { showNotification } from 'pages/pro/components/Projects/util';
import { NotificationType } from 'pages/pro/components/Projects/ViewProject/types';
import PreviewCard from 'pages/pro/onboarding/desktop/previewCard';
import {
  ButtonBackToEdit,
  ButtonCreateJobPost,
  ButtonWrapper,
  CardsSlidesWrapper,
  LeftSection,
  ReviewContent,
  ReviewJobDecs,
  ReviewJobText,
  ReviewThumb,
  RightSection,
  JobsSlider,
} from 'pages/jobs/review/styles';
import { IImage } from 'components/ImageUpload/types';
import { useSelector } from 'react-redux';
import { selectCurrentCompany } from 'pages/account/authSlice';
import { Container } from '../create/styles';
import { ReviewJobProps } from './types';
import { useAddJobMutation, useEditJobMutation } from '../jobsService';
import { addJobAPICall, formatPayload } from '../addJobAPI';
import { useUploadJobsImages } from '../imageUpload';
import { IJobsImages } from '../details/types';

const { jobs } = lang;
const ReviewJob = ({ back, values, isEdit }: ReviewJobProps) => {
  const { isDesktopView } = useWindowDimensions();
  const { jobsImages } = useUploadJobsImages();
  const router = useRouter();
  const { id } = router.query;
  const [addJob] = useAddJobMutation();
  const [editJob] = useEditJobMutation();
  const [isLoading, setIsLoading] = useState(false);
  const currentCompany = useSelector(selectCurrentCompany);

  const previewCardImage = (jobPicture?: IImage | null, backgroundImage?: string | null) => {
    if (jobPicture) {
      return URL.createObjectURL(jobPicture?.file);
    }
    if (backgroundImage) {
      return backgroundImage;
    }
    return PlaceholderImage.src;
  };

  const JobCardSlide = (
    <PreviewCard
      fullName=""
      picture={previewCardImage(values?.jobPicture, values?.backgroundImage)}
      mantra=""
      currentStep={1}
    >
      <JobCard
        companyName={currentCompany?.name}
        role={values?.role}
        location={values?.location?.label}
        jobType={values?.jobType}
        locationType={values?.locationType}
        salaryFrom={values?.salaryFrom}
        salaryTo={values?.salaryTo}
      />
    </PreviewCard>
  );

  const SnapShotCardSlide = (
    <PreviewCard
      fullName=""
      picture={previewCardImage(values?.snapShotPicture, values?.snapShotBackground)}
      mantra=""
      currentStep={1}
    >
      <JobSnapshotCard
        companyName={currentCompany?.name}
        text={values?.snapshotDescription}
      />
    </PreviewCard>
  );

  const slides = [JobCardSlide, SnapShotCardSlide];

  const handelSubmit = async () => {
    setIsLoading(true);
    try {
      const imageData: IJobsImages = {
        images: [],
      };
      if (values?.jobPicture) {
        imageData.images.push({
          ...values?.jobPicture,
          returnKeyName: 'background',
        });
      }
      if (values?.snapShotPicture) {
        imageData.images.push({
          ...values?.snapShotPicture,
          returnKeyName: 'snapshot_background',
        });
      }

      const jobsImagesPath = await jobsImages(imageData);
      let response = null;
      if (isEdit) {
        response = formatPayload(values, jobsImagesPath, currentCompany?.id);
        response = await editJob({ formData: response, uuid: id });
      } else {
        response = await addJobAPICall(values, addJob, jobsImagesPath, currentCompany?.id);
      }

      if (response?.data?.data?.uuid) {
        router.push(`/jobs/details/${response?.data?.data?.uuid}`);
      }
    } catch (error: any) {
      showNotification(error?.data?.message, NotificationType.ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container isDesktopView={isDesktopView}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <LeftSection>
            <ReviewContent>
              <ReviewThumb>
                <OkThumbs />
              </ReviewThumb>
              <ReviewJobText>{jobs.reviewYourJob}</ReviewJobText>
              <ReviewJobDecs>{jobs.reviewJobDecs}</ReviewJobDecs>
              {!isDesktopView && (
                <CardsSlidesWrapper>
                  <JobsSlider>
                    <ProfileCard slides={slides} />
                  </JobsSlider>
                </CardsSlidesWrapper>
              )}
            </ReviewContent>
            <ButtonWrapper>
              <ButtonBackToEdit>
                <ButtonComp
                  primary
                  variant="link"
                  fullWidth
                  label={jobs.backToEdit}
                  onClick={back}
                />
              </ButtonBackToEdit>
              <ButtonCreateJobPost>
                <ButtonComp
                  primary
                  label={isEdit ? jobs.saveJobPost : jobs.createJobPost}
                  type="submit"
                  fullWidth
                  onClick={handelSubmit}
                />
              </ButtonCreateJobPost>
            </ButtonWrapper>
          </LeftSection>
          {isDesktopView && (
            <RightSection>
              <CardsSlidesWrapper>
                <ProfileCard slides={slides} />
              </CardsSlidesWrapper>
            </RightSection>
          )}
        </>
      )}
    </Container>
  );
};

export default ReviewJob;
