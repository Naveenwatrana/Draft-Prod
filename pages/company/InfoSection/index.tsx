import ButtonComp from 'components/buttonComp';
import Image from 'next/image';
import lang from 'common/lang';
import DefaultProfile from 'components/Icons/DefaultProfile';
import { AuthorName, ContentWrapper, PublishInfo } from './styles';
import { InfoSectionProps } from './types';

const {
  article: { followButtonLabel },
} = lang;

const InfoSection = ({
  logo,
  companyName,
  followers,
  following,
  account,
}: InfoSectionProps) => {
  return (
    <>
      {logo ? (
        <Image src={logo} alt="display image" width={40} height={52} />
      ) : (
        <DefaultProfile width={40} height={52} />
      )}
      <ContentWrapper>
        <AuthorName>{companyName}</AuthorName>
        {account && <PublishInfo>{`@${account}`}</PublishInfo>}
        <PublishInfo>{`${followers} followers | ${following} following`}</PublishInfo>
      </ContentWrapper>
      <ButtonComp primary label={followButtonLabel} />
    </>
  );
};

export default InfoSection;
