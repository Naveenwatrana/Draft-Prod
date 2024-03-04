import { useIsMobile } from 'common/hooks/useIsMobile';
import lang from 'common/lang';
import MobileImage from './share-a-link-mobile-graphic.png';
import DesktopImage from './share-a-link-graphic.png';
import { Graphic } from './style';

const { shareALink } = lang.linkPosts;
const ShareLinkGraphic = () => {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <Graphic width={393} height={159} src={MobileImage} alt={shareALink} />
    );
  }
  return (
    <Graphic width={576} height={541} src={DesktopImage} alt={shareALink} />
  );
};

export default ShareLinkGraphic;
