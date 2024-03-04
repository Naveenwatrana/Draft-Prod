import Image from 'next/image';
import lang from 'common/lang';
import DefaultProfile from 'components/Icons/DefaultProfile';
import { formatDate } from 'common/utils/date/dateFormat';
import { ARTICLE_DATE_FORMAT } from 'common/constants';
import FollowButton from 'components/Atoms/FollowButton';
import useFollow from 'common/hooks/useFollow';
import { AuthorName, ContentWrapper, PublishInfo } from './styles';
import { InfoSectionProps } from './types';

const {
  article: { unpublishDate },
} = lang;

const InfoSection = ({
  authorInfo, publishInfo, userIsAuthor, authorIsCompany,
}: InfoSectionProps) => {
  const imageSrc = authorInfo.presigned_profile_cover || authorInfo?.logo;
  const publishedDate = publishInfo ? formatDate(publishInfo, ARTICLE_DATE_FORMAT) : unpublishDate;
  const { followArticleUsers } = useFollow();

  const handleFollowButton = () => {
    followArticleUsers(authorInfo.id, !!authorIsCompany);
  };

  return (
    <>
      { imageSrc ? <Image src={imageSrc} alt="display image" width={40} height={52} /> : <DefaultProfile width={40} height={52} />}
      <ContentWrapper>
        <AuthorName>{authorInfo?.name}</AuthorName>
        <PublishInfo>{publishedDate}</PublishInfo>
      </ContentWrapper>
      {!userIsAuthor && <FollowButton isFollowing={authorInfo.followed} onClick={handleFollowButton} />}
    </>
  );
};

export default InfoSection;
