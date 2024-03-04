import React, { ForwardedRef, forwardRef, useState } from 'react';
import ProfileFollow from 'components/Atoms/FollowButton/ProfileFollow';
import {
  IInteractionEventValueType,
  IInteractionItemTypes,
  IInteractionTypes,
} from 'common/services/Aladdin/types';
import SaveContent from 'components/Icons/SaveContent';
import lang from 'common/lang';
import ButtonComp from 'components/buttonComp';
import { useAppSelector } from 'common/hooks/state';
import { selectCurrentUser } from 'pages/account/authSlice';
import EllipseIcon from 'components/Icons/EllipseIcon';
import { theme } from 'common/theme';
import { useIsMobile } from 'common/hooks/useIsMobile';
import useFollow from 'common/hooks/useFollow';
import useAladdinInteraction from 'common/services/Aladdin/useAladdinInteraction';
import { useParams } from 'next/navigation';
import { useNavigate } from 'common/utils/router-fill';
import { useSaveContent } from 'common/hooks/useSaveContent';
import { messagesUrl, org, pro } from 'common/utils/network/appRouts';
import Loader from 'components/Loader/Loader';
import ImagePlaceholderIcon from 'components/Icons/ImagePlaceholderIcon';
import AddIcon from 'components/Icons/AddIcon';
import EditProfileBioModal from 'pages/pro/[username]/EditProfileBioForm/EditProfileBioModal';
import ImageCropModal from 'pages/pro/[username]/EditProfileBioForm/ImageCropModal';
import ShareProfileBio from 'components/Atoms/ShareProfileBio/ShareProfileBio';
import { DividerComp } from 'components/Divider/styles';
import LocationIcon from 'components/Icons/LocationIcon';
import PencilScaleIcon from 'components/Icons/PencilScaleIcon';
import { BioProps } from './type';
import {
  Container,
  ProfileImage,
  InfoSection,
  Title,
  Subtitle,
  Mantra,
  TitleContainer,
  FollowContainer,
  Follow,
  Typography,
  FollowContent,
  ActionSection,
  SkillSection,
  SkillTag,
  MsgButton,
  FollowBtn,
  SaveContentWrapper,
  ImgPlaceholder,
  UploadContainer,
  AddText,
  UploadBtn,
  UploadWrapper,
  InfoSectionWrapper,
  InfoSectionEditContainer,
  InfoEditWrapper,
  EditBioButton,
  EditBioBtnWrapper,
  SubTitleWrapper,
  LocationIconWrapper,
  ActionSectionWrapper,
  SkillSectionWrapper,
  PencilIconWrapper,
} from './style';

const {
  article: { followButtonLabel },
  messages: { message },
  userBio: {
    hide, followersTxt, followingTxt, bioBtn, addBioText, editBioBtnText,
  },
} = lang;

const ProfileBio = forwardRef(
  (
    {
      title,
      subtitle,
      followers,
      following,
      isLoading,
      setSkip,
      mantra,
      skills,
      id,
      isFollowing,
      isSaved,
      media,
      itemType,
      pinType,
    }: BioProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const currentUser = useAppSelector(selectCurrentUser);
    const isMobile = useIsMobile();
    const [showMoreSkillData, setShowMoreSkillData] = useState<boolean>();
    const {
      followUser,
      followCompany,
      results: { isLoading: isFollowLoading },
      companyResults: { isLoading: isCompanyFollowLoading },
    } = useFollow();
    const { saveInteraction } = useAladdinInteraction();
    const params = useParams();
    const navigate = useNavigate();
    const { saveContent, isLoading: saveContentLoading } = useSaveContent();

    const handleSave = () => {
      // Aladdin interaction event
      saveInteraction({
        itemId: id,
        itemType,
        eventType: IInteractionTypes.Save,
        eventValue: IInteractionEventValueType.brandTab,
      });
      // Aladdin interaction event
      saveContent(
        id,
        pinType,
        itemType,
      );
      setSkip();
    };
    const isOrganization = itemType === IInteractionItemTypes.companies;
    const handleFollow = () => {
      if (isOrganization) {
        followCompany(id);
      } else {
        followUser(id);
      }
      saveInteraction({
        itemId: id,
        itemType,
        eventType: IInteractionTypes.Follow,
      });
      setSkip();
    };

    const showLessSkills = () => {
      setShowMoreSkillData(false);
    };

    const showMoreSkills = () => {
      setShowMoreSkillData(true);
    };

    const initialSkillLength = 4;
    const loadCount = showMoreSkillData ? skills.length : initialSkillLength;

    const handleMessage = () => {
      navigate(
        `${messagesUrl}${isOrganization ? `${org}/${params.tab}` : `${pro}/${params.username}`}`,
      );
    };

    const numberOfMoreData = (skills || []).length - initialSkillLength;
    const moreData = numberOfMoreData.toString();
    const [isOpen, setIsOpen] = useState(false);
    const [cropImageFile, setCropImageFile] = useState<File | string>();
    const [isCropImgModalOpen, setIsCropImgModalOpen] = useState(false);
    const editable = currentUser?.id === id;
    const handleCroppedImage = (croppedImage:File | string) => {
      setCropImageFile(croppedImage);
      setIsCropImgModalOpen(false);
    };
    const handleUploadFileCallback = (file: File | string) => {
      setCropImageFile(file);
    };

    return (
      <Container ref={ref}>
        <ImgPlaceholder>
          {media ? <ProfileImage media={media} />
            : (
              <UploadWrapper>
                <ImagePlaceholderIcon />
              </UploadWrapper>
            )}
        </ImgPlaceholder>
        {(saveContentLoading
          || isLoading
          || isFollowLoading
          || isCompanyFollowLoading) && <Loader />}
        {isOpen
        && (
          <EditProfileBioModal
            closeForm={() => {
              setIsOpen(false);
              setCropImageFile(undefined);
            }}
            setSkip={setSkip}
            validated={false}
            cropImageFile={cropImageFile}
            handleUploadFileCallback={handleUploadFileCallback}
            setIsCropImgModalOpen={setIsCropImgModalOpen}
          />
        )}
        {isCropImgModalOpen && <ImageCropModal uploadCropImage={handleCroppedImage} uploadedFile={cropImageFile as string} closeForm={() => setIsCropImgModalOpen(false)} />}
        <InfoSectionWrapper>
          {editable
          && (
            <InfoSectionEditContainer>
              <UploadContainer>
                <AddText>{addBioText}</AddText>
                <UploadBtn onClick={() => setIsOpen(true)}>
                  <AddIcon color={theme.palette.white[100].value} />
                  {bioBtn}
                </UploadBtn>
              </UploadContainer>
            </InfoSectionEditContainer>
          )}
          <InfoEditWrapper>
            <InfoSection>
              <TitleContainer>
                <Title>{title}</Title>
              </TitleContainer>
              <Mantra>{mantra}</Mantra>
              <FollowContainer>
                <FollowContent>
                  <Follow>{followers}</Follow>
                  <Typography>{followersTxt}</Typography>
                  <EllipseIcon
                    color={theme.palette.white[100].value}
                    variant="small"
                    fill-opacity="0.5"
                  />
                  <Follow>{following}</Follow>
                  <Typography>{followingTxt}</Typography>
                </FollowContent>
              </FollowContainer>
            </InfoSection>
            <ActionSectionWrapper>
              {currentUser?.id !== id && !isMobile && (
                <ActionSection>
                  {!isFollowing && (
                    <FollowBtn
                      primary
                      label={followButtonLabel}
                      onClick={handleFollow}
                    />
                  )}
                  {isFollowing && (
                    <>
                      <MsgButton primary label={message} onClick={handleMessage} />
                      <ProfileFollow
                        onClick={handleFollow}
                        isFollowing={isFollowing}
                      />
                    </>
                  )}
                  <ShareProfileBio id="" itemType={itemType} primary={false} />
                  <SaveContentWrapper data-cy="savedContentBtn" onClick={handleSave}>
                    <SaveContent active={isSaved} />
                  </SaveContentWrapper>
                </ActionSection>
              )}
              {editable && (
                <EditBioBtnWrapper>
                  <EditBioButton
                    primary
                    label={editBioBtnText}
                    onClick={() => setIsOpen(true)}
                  />
                  <ShareProfileBio id="" itemType={itemType} primary={false} />
                </EditBioBtnWrapper>
              )}
              <DividerComp />
              {skills?.length > 0 && (
                <SkillSectionWrapper>
                  <PencilIconWrapper>
                    <PencilScaleIcon />
                  </PencilIconWrapper>
                  <SkillSection>
                    {skills?.slice(0, loadCount).map((skill: string, index) => (
                      <SkillTag data-cy={`skill-${index}`} key={skill}>{skill}</SkillTag>
                    ))}
                    {(skills?.length > initialSkillLength && showMoreSkillData && (
                      <ButtonComp variant="link" label={hide} onClick={showLessSkills} />
                    ))
            || (skills?.length > initialSkillLength && !showMoreSkillData && (
              <SkillTag data-cy="showMoreSkills" onClick={showMoreSkills}>{`+${moreData}`}</SkillTag>
            ))}
                  </SkillSection>
                </SkillSectionWrapper>
              )}
              <SubTitleWrapper>
                <LocationIconWrapper>
                  <LocationIcon />
                </LocationIconWrapper>
                <Subtitle>{subtitle}</Subtitle>
              </SubTitleWrapper>
            </ActionSectionWrapper>
          </InfoEditWrapper>
        </InfoSectionWrapper>
        {currentUser?.id !== id && isMobile && (
          <ActionSection>
            {!isFollowing && (
              <FollowBtn
                primary
                label={followButtonLabel}
                onClick={handleFollow}
              />
            )}
            {isFollowing && (
              <>
                <MsgButton primary label={message} onClick={handleMessage} />
                <ProfileFollow
                  onClick={handleFollow}
                  isFollowing={isFollowing}
                />
              </>
            )}
            <ShareProfileBio id="" itemType={itemType} primary={false} />
            <SaveContentWrapper onClick={handleSave}>
              <SaveContent active={isSaved} />
            </SaveContentWrapper>
          </ActionSection>
        )}
      </Container>
    );
  },
);

ProfileBio.displayName = 'ProfileBio';

export default ProfileBio;
