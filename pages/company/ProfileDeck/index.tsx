import { IconContainer, IconsContainer } from 'pages/pro/styles';
import PencilIcon from 'components/Icons/PencilIcon';
import CompanyCards from 'pages/feed/Cards/CompanyCards';
import { IFeedData } from 'pages/feed/types';
import { CompanyProfileDeckProps } from './types';
import { BasicDetailsContainer } from './styles';

const CompanyProfileDeck = ({
  data, setEditImageDetail, onCardClick, isOwnProfile,
}: CompanyProfileDeckProps) => {
  return (
    <BasicDetailsContainer>
      <CompanyCards
        data={data as IFeedData}
        key={`SavedCard${data?.id}`}
        hideHeader
        onClick={onCardClick}
      />
      {(isOwnProfile) && (
        <IconsContainer onClick={() => setEditImageDetail(true)}>
          <IconContainer contained>
            <PencilIcon size={16} />
          </IconContainer>
        </IconsContainer>
      )}
    </BasicDetailsContainer>
  );
};

export default CompanyProfileDeck;
