import CardStack from 'components/Icons/CardStack';
import SaveContent from 'components/Icons/SaveContent';
import TextComp from 'components/textComp';
import { DefaultCardHeaderProps } from '../types';
import {
  CardHeader,
  CardIcon,
  CardStackIconContainer,
  CardStackIconWrapper,
  CardType,
} from './styles';

const DefaultCardHeader = ({
  hideHeader,
  totalCardsinStack = 1,
  type,
  showCardType = false,
  showSave = false,
}: DefaultCardHeaderProps) => {
  return (
    <CardHeader>
      <CardStackIconContainer hideElement={hideHeader}>
        <CardStackIconWrapper>
          <CardStack />
          <TextComp>{totalCardsinStack}</TextComp>
        </CardStackIconWrapper>
      </CardStackIconContainer>
      <CardType hideElement={hideHeader || !showCardType}>
        {type.toUpperCase()}
      </CardType>
      <CardIcon hideElement={hideHeader}>
        {showSave && <SaveContent />}
      </CardIcon>
    </CardHeader>
  );
};

export default DefaultCardHeader;
