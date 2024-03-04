import lang from 'common/lang';
import Image from 'next/image';
import ShadowIcon from 'components/Icons/ShadowIcon';
import NoProfileCardIcon from '/public/images/noProfileCardIcon.png';

import {
  UserCardContainer, ShadowIconWrapper, UserNameContainer, MainContentWrapper, BasicDetailsContainer, AddCardButton,
} from './styles';
const { profile: { noProfileBlock } } = lang;

export type ViewBasicDetailsProps = {
    firstName: string;
    lastName: string;
    picture: string;
    mantra: string;
    setEditImageDetail: (value: boolean) => void;
};

const BlankUserCard = ({
  firstName, lastName, picture, mantra, setEditImageDetail,
}: ViewBasicDetailsProps) => {
  return (
    <BasicDetailsContainer>
      <UserCardContainer>
        <ShadowIconWrapper>
          <ShadowIcon />
        </ShadowIconWrapper>
        <MainContentWrapper>
          <Image src={NoProfileCardIcon.src} alt="" width={180} height={180} />
          <h3>
            {noProfileBlock.noCards.title}
          </h3>
          <p>
            {noProfileBlock.noCards.line1}
          </p>
          <p>
            {noProfileBlock.noCards.line2}
          </p>
          <AddCardButton onClick={() => { setEditImageDetail(true); }}>{noProfileBlock.noCards.addCard}</AddCardButton>
        </MainContentWrapper>
        <UserNameContainer>
          {`${firstName} ${lastName}`}
        </UserNameContainer>
      </UserCardContainer>
    </BasicDetailsContainer>
  );
};

export default BlankUserCard;
