import { useAppSelector } from 'common/hooks/state';
import DefaultCard from 'components/DefaultCard';
import { Card, CardTypes } from 'components/CardCreationWizard/types';
import { getCard } from 'components/CardCreationWizard/slice';
import { selectCurrentCompany, selectCurrentUser } from 'pages/account/authSlice';
import { Container } from './styles';
import { CardPreviewProps } from './types';
import { getCoverImage } from './utils';
import { isAkamaiImage } from '../CardWorkArea/utils';

const CardPreview = ({ selectedCard, handleEditImage, jobCoverCardsData }: CardPreviewProps) => {
  const card = useAppSelector<Card>(getCard(selectedCard.id));
  const currentUser = useAppSelector(selectCurrentUser);
  const userIsCompany = useAppSelector(selectCurrentCompany);
  const userName = `${currentUser?.first_name} ${currentUser?.last_name}`;
  const companyName = userIsCompany?.name;
  const handleCardClick = () => {
    if (handleEditImage && card?.fieldValues?.media && !isAkamaiImage(card?.fieldValues?.media as string)) {
      handleEditImage(true);
    }
  };
  return (
    <Container data-cy="cardPreview">
      {card?.type === CardTypes.Cover && !jobCoverCardsData && (
        <DefaultCard
          icon={card?.fieldValues?.logo as string || ''}
          type="info"
          onClick={handleCardClick}
          height="483px"
          width="286px"
          secondaryText={card?.fieldValues?.mantra as string || ''}
          primaryText={userIsCompany ? companyName : userName}
          cover={getCoverImage(card?.fieldValues)}
          isLocalVideo={card?.fieldValues?.localVideo as string || ''}
          hideHeader
          userNameClickable={false}
        />
      )}
      {card?.type === CardTypes.Cover && jobCoverCardsData && (
        <DefaultCard
          icon={card?.fieldValues?.logo as string || jobCoverCardsData.icon || ''}
          primaryText={jobCoverCardsData.companyName || userIsCompany ? companyName : userName}
          secondaryText={card?.fieldValues?.mantra as string || jobCoverCardsData.role}
          tertiaryText={jobCoverCardsData.employmentType}
          tertiaryPairText={[jobCoverCardsData.locationType, jobCoverCardsData.location] as [string, string]}
          type="job"
          range={{
            from: jobCoverCardsData.salaryFrom || 0,
            to: jobCoverCardsData.salaryTo || 0,
          }}
          onClick={handleCardClick}
          height="483px"
          width="286px"
          cover={getCoverImage(card?.fieldValues)}
          isLocalVideo={card?.fieldValues?.localVideo as string || ''}
          hideHeader
          userNameClickable={false}
        />
      )}
      {card?.type === CardTypes.About && (
        <DefaultCard
          type="about"
          onClick={handleCardClick}
          height="483px"
          width="286px"
          cover={getCoverImage(card?.fieldValues)}
          primaryText={userIsCompany ? companyName : userName}
          longTextTitle={card?.fieldValues?.heading as string || ''}
          longText={card?.fieldValues?.description as string || ''}
          isLocalVideo={card?.fieldValues?.localVideo as string || ''}
          hideHeader
          userNameClickable={false}
        />
      )}
      {card?.type === CardTypes.Link && (
        <DefaultCard
          type="link"
          onClick={handleCardClick}
          height="483px"
          width="286px"
          secondaryText={card?.fieldValues?.mantra as string || ''}
          primaryText={userIsCompany ? companyName : userName}
          cover={getCoverImage(card?.fieldValues)}
          isLocalVideo={card?.fieldValues?.localVideo as string || ''}
          hideHeader
          links={card.fieldValues?.links as any[] || []}
          userNameClickable={false}
        />
      )}
    </Container>
  );
};

export default CardPreview;
