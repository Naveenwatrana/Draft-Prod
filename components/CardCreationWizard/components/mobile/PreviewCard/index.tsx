import { useAppSelector } from 'common/hooks/state';
import { Card, CardTypes } from 'components/CardCreationWizard/types';
import { getCard } from 'components/CardCreationWizard/slice';
import { useWindowDimensions } from 'common/hooks';
import { selectCurrentCompany, selectCurrentUser } from 'pages/account/authSlice';
import {
  Button, CardElement,
} from './styles';
import { PreviewCardProps } from './types';
import CardModal from '../CardModal';
import { getCoverImage } from '../../CardPreview/utils';

const PreviewCard = ({
  active,
  onClick,
  data,
  nextButton,
  onClose,
  onCancel,
  title,
  description,
  nextButtonText,
}: PreviewCardProps) => {
  const card = useAppSelector<Card>(getCard(data.id));
  const currentUser = useAppSelector(selectCurrentUser);
  const { isDesktopView } = useWindowDimensions();
  const userIsCompany = useAppSelector(selectCurrentCompany);
  const userName = `${currentUser?.first_name} ${currentUser?.last_name}`;
  const companyName = userIsCompany?.name;
  const cardWidth = isDesktopView ? '121px' : 'calc((95vh - 212px) / 1.54)';
  const cardHeight = isDesktopView ? '195px' : 'calc(95vh - 212px)';
  return (
    <CardModal
      title={title}
      onClose={onClose}
      description={description}
      cancel={onCancel}
      nextButton={nextButton}
      nextButtonText={nextButtonText}
    >
      <Button type="button" onClick={onClick}>
        {card?.type === CardTypes.Cover && (
          <CardElement
            type="info"
            icon={card?.fieldValues?.logo as string || ''}
            active={active}
            onClick={() => {}}
            width={cardWidth}
            height={cardHeight}
            primaryFontSize={isDesktopView ? '6px' : undefined}
            hideHeader
            secondaryText={card?.fieldValues?.mantra as string || ''}
            cover={getCoverImage(card?.fieldValues)}
            primaryText={userIsCompany ? companyName : userName}
            isLocalVideo={card?.fieldValues?.localVideo as string || ''}
            userNameClickable={false}
          />
        )}
        {card?.type === CardTypes.About && (
          <CardElement
            type="about"
            active={active}
            onClick={() => {}}
            width={cardWidth}
            height={cardHeight}
            cover={getCoverImage(card?.fieldValues)}
            primaryText={userIsCompany ? companyName : userName}
            longTextTitle={card?.fieldValues?.heading as string || ''}
            longText={card?.fieldValues?.description as string || ''}
            primaryFontSize={isDesktopView ? '6px' : undefined}
            hideHeader
            userNameClickable={false}
          />
        )}
        {card?.type === CardTypes.Link && (
          <CardElement
            type="link"
            active={active}
            onClick={() => {}}
            width={cardWidth}
            height={cardHeight}
            cover={getCoverImage(card?.fieldValues)}
            primaryText={userIsCompany ? companyName : userName}
            longText={`${card?.fieldValues?.heading || ''} ${card?.fieldValues?.description || ''}`}
            primaryFontSize={isDesktopView ? '6px' : undefined}
            links={card?.fieldValues?.links as any[] || []}
            hideHeader
            userNameClickable={false}
          />
        )}
      </Button>
    </CardModal>

  );
};

export default PreviewCard;
