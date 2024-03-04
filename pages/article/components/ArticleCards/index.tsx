import DefaultCard from 'components/DefaultCard';
import { CardSizes } from 'components/DefaultCard/types';
import { CardTypes } from 'components/CardCreationWizard/types';
import useCompany from 'common/hooks/useCompany';
import { getCoverImage } from 'components/CardCreationWizard/components/CardPreview/utils';
import { ArticleCardsProps } from './types';
import AddNewCard from './AddNewCard';
import { CardContainer, CardWrapper } from './styles';

const ArticleCards = ({
  cards, selectCard, addNewCard, maxCards, className,
}: ArticleCardsProps) => {
  const { currentUser, currentCompany } = useCompany();
  const userName = currentCompany?.name || `${currentUser?.first_name} ${currentUser?.last_name}` || '';

  return (
    <CardContainer className={className}>
      {cards?.map((card) => (
        <CardWrapper onClick={() => selectCard(card)} type="button" key={card.id}>
          {card?.type === CardTypes.Cover && (
            <DefaultCard
              type="info"
              onClick={() => undefined}
              height="346px"
              width="205px"
              secondaryText={card?.fieldValues?.mantra as string || ''}
              primaryText={userName}
              cover={getCoverImage(card?.fieldValues)}
              hideHeader
              isLocalVideo={card?.fieldValues?.fileType as string || ''}
            />
          )}
          {card?.type === CardTypes.About && (
            <DefaultCard
              type="about"
              onClick={() => undefined}
              width="205px"
              height="346px"
              cover={getCoverImage(card?.fieldValues)}
              primaryText={userName}
              longTextTitle={card?.fieldValues?.heading as string || ''}
              longText={card?.fieldValues?.description as string || ''}
              hideHeader
              size={CardSizes.MEDIUM}
              isLocalVideo={card?.fieldValues?.fileType as string || ''}
            />
          )}
          {card?.type === CardTypes.Link && (
            <DefaultCard
              type="link"
              onClick={() => undefined}
              height="346px"
              width="205px"
              size={CardSizes.MEDIUM}
              secondaryText={card?.fieldValues?.mantra as string || ''}
              primaryText={userName}
              cover={getCoverImage(card?.fieldValues)}
              hideHeader
              links={card.fieldValues?.links as any[] || []}
              isLocalVideo={card?.fieldValues?.fileType as string || ''}
            />
          )}
        </CardWrapper>
      ))}
      {maxCards && cards.length < maxCards && <AddNewCard active={true} onClick={addNewCard} />}
    </CardContainer>
  );
};

export default ArticleCards;
