import { useAppSelector } from 'common/hooks/state';
import { Card, CardTypes } from 'components/CardCreationWizard/types';
import { getCard } from 'components/CardCreationWizard/slice';
import { useWindowDimensions } from 'common/hooks';
import { selectCurrentCompany, selectCurrentUser } from 'pages/account/authSlice';
import { DefaultCardProps } from 'components/DefaultCard/types';
import { Button, CardElement, Divider } from './styles';
import { ExistingCardProps } from './types';
import { getCoverImage } from '../CardPreview/utils';

const ExistingCard = ({
  active, onClick, data, size, dataCy, jobCoverCardsData,
}: ExistingCardProps) => {
  const card = useAppSelector<Card>(getCard(data.id));
  const currentUser = useAppSelector(selectCurrentUser);
  const { isDesktopView } = useWindowDimensions();
  const userIsCompany = useAppSelector(selectCurrentCompany);
  const userName = `${currentUser?.first_name} ${currentUser?.last_name}`;
  const companyName = userIsCompany?.name;

  const cardWidth = isDesktopView ? '121px' : '80vw';
  const cardHeight = isDesktopView ? '195px' : '70vh';
  const primaryText = userIsCompany ? companyName : userName;
  let cardType = card?.type === CardTypes.Cover ? 'info' : 'about';
  cardType = card?.type === CardTypes.Link ? 'link' : cardType;
  let commonCardProps: DefaultCardProps = {
    type: cardType,
    onClick: () => {},
    width: cardWidth,
    height: cardHeight,
    primaryFontSize: isDesktopView ? '6px' : undefined,
    size,
    hideHeader: true,
    cover: getCoverImage(card?.fieldValues),
    primaryText,
    secondaryText: card?.fieldValues?.mantra as string || '',
    longTextTitle: card?.fieldValues?.heading as string || '',
    longText: card?.fieldValues?.description as string || '',
    links: card?.fieldValues?.links as { name: string, url: string }[] || [],
    userNameClickable: false,

  };
  if (card?.type === CardTypes.Cover && jobCoverCardsData) {
    commonCardProps = {
      ...commonCardProps,
      icon: jobCoverCardsData?.icon,
      primaryText: jobCoverCardsData?.companyName,
      secondaryText: jobCoverCardsData?.title,
      tertiaryText: jobCoverCardsData?.employmentType,
      tertiaryPairText: [jobCoverCardsData?.locationType, jobCoverCardsData?.location],
      type: 'job',
      range: {
        from: jobCoverCardsData?.salaryFrom || 0,
        to: jobCoverCardsData?.salaryTo || 0,
      },
    };
  }

  return (
    <>
      <Button type="button" onClick={onClick} data-cy={dataCy}>
        <CardElement
          {...commonCardProps}
          active={active}
          isLocalVideo={card?.fieldValues?.localVideo as string || ''}
          isStopped
        />
      </Button>
      {isDesktopView && <Divider />}
    </>
  );
};

export default ExistingCard;
