import TrashIcon from 'components/Icons/TrashIcon';
import { theme } from 'common/theme';
import { ViewUploadedImageProps } from './types';
import {
  DeleteIcon, ImageWithStyle, ViewImageContainer, ViewImageWrapper,
} from './styles';

const ViewUploadedImage = ({ setFile, file }: ViewUploadedImageProps) => (
  <ViewImageWrapper>
    <ViewImageContainer>
      <ImageWithStyle width={800} height={600} src={file} alt="story image" />
    </ViewImageContainer>
    <DeleteIcon data-cy="deleteIcon" onClick={() => setFile()} bg={theme.palette.red[90].value}>
      <TrashIcon color={theme.palette.red[100].value} />
    </DeleteIcon>
  </ViewImageWrapper>
);

export default ViewUploadedImage;
