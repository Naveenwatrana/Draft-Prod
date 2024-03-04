import {
  IconContainer, IconsContainer,
} from 'pages/pro/styles';
import PencilIcon from 'components/Icons/pencil.svg';
import DefaultCard from 'components/DefaultCard';
import { useAppSelector } from 'common/hooks/state';
import { getIsCurrentUser } from 'pages/pro/profileSlice';
import {
  BasicDetailsContainer,
} from '../../styles';

export type ViewBasicDetailsProps = {
    firstName: string;
    lastName: string;
    picture: string;
    mantra: string;
    setEditImageDetail: (value: boolean) => void;
};

const ViewBasicDetails = ({
  firstName, lastName, picture, mantra, setEditImageDetail,
}: ViewBasicDetailsProps) => {
  const isCurrentUser = useAppSelector(getIsCurrentUser);
  return (

    <BasicDetailsContainer>
      <div>
        <DefaultCard
          key={1}
          primaryText={`${firstName} ${lastName}`}
          secondaryText={mantra}
          type="info"
          onClick={() => undefined}
          cover={picture}
          hideHeader
        />
        {isCurrentUser && (
          <IconsContainer onClick={() => setEditImageDetail(true)}>
            <IconContainer contained>
              <PencilIcon size={16} />
            </IconContainer>
          </IconsContainer>
        )}
      </div>
    </BasicDetailsContainer>
  );
};

export default ViewBasicDetails;
