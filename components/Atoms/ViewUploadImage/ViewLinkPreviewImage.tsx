import TrashIcon from 'components/Icons/TrashIcon';
import { theme } from 'common/theme';
import lang from 'common/lang';
import { ViewUploadedImageProps } from './types';
import {
  DeleteIcon, LinkImageWithStyle, ViewImageWrapper, ViewLinkImageContainer,
} from './styles';

const { linkPreview } = lang.linkPosts;
const ViewLinkUploadedImage = ({ setFile, file }: ViewUploadedImageProps) => (
  <ViewImageWrapper>
    <ViewLinkImageContainer>
      <LinkImageWithStyle width={800} height={600} src={file} alt={linkPreview} />
    </ViewLinkImageContainer>
    <DeleteIcon onClick={setFile} bg={theme.palette.red[90].value}>
      <TrashIcon color={theme.palette.red[100].value} />
    </DeleteIcon>
  </ViewImageWrapper>
);

export default ViewLinkUploadedImage;
