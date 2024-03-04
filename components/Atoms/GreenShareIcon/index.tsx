import ShareIcon from 'components/Icons/ShareIcon';
import { theme } from 'common/theme';
import { FilledButtonIcon } from './style';
import { IconWrapper } from '../IconWrapper';

export type GreenShareIconProps = {
  primary?: boolean;
};
const GreenShareIcon = ({ primary = true }: GreenShareIconProps) => {
  if (primary) {
    return (
      <FilledButtonIcon data-cy="shareLinkButton">
        <ShareIcon size={20} color={theme.palette.gray['80'].value} />
      </FilledButtonIcon>
    );
  }
  return (
    <IconWrapper data-cy="shareLinkButton">
      <ShareIcon size={20} color={theme.palette.white['100'].value} />
    </IconWrapper>
  );
};

export default GreenShareIcon;
