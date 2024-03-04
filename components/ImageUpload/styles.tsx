import { getImageUploadInputHeight } from 'pages/pro/components/Projects/util';
import styled from 'styled-components';
import { ImageUploadInputProps } from 'components/ImageUpload/types';

export const ImageUploadInput = styled.div<ImageUploadInputProps>`
  height: ${({ height, error }) => height ? getImageUploadInputHeight(`${height}`, error) : '100%'};
  padding: 12px;
  border-radius: ${({ withHeader }) => withHeader ? '0 0 12px 12px' : '12px'};
  background-color: ${(props) => props.error ? 'transparent' : '#2A282B'};
  border: 1px solid ${({ theme: { palette }, error }) => error ? palette.red['100'].value : '#39363B'};
`;

export const Files = styled.div`
    display: flex;
    margin-top: 24px;

    @media (max-width: 768px) {
      flex-direction: column;
    }
`;
export const File = styled.div`
    display: flex;
    flex-direction: column;
    width: 180px;
    margin-right: 24px;
    white-space: pre-wrap;
    word-break: break-word;
`;

export const ImageDetails = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
export const Error = styled.p`
  background-color: ${(props) => props.theme.palette.red['100'].value};
  color: ${(props) => props.theme.palette.white['100'].value};
  font-size: ${(props) => props.theme.typography['12 semibold'].fontSize.value}px;
  font-weight: ${(props) => props.theme.typography['12 semibold'].fontWeight};
  padding: 10px 1px;
  border-radius: 12px 12px 0 0;
  margin: 0;
  width: 100%;
  text-align: center;
`;
export const Thumbnail = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;
export const ThumbnailContent = styled.div`
  background: ${(props) => props.theme.palette.violet['80'].value};
  color: white;
  padding: 10px;
  border-radius: 12px;
  font-size: ${(props) => props.theme.typography['12 semibold'].fontSize.value}px;
  font-weight: ${(props) => props.theme.typography['12 semibold'].fontWeight};
  border: 1px solid ${(props) => props.theme.palette.white['100'].value};
  width: 91px;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 13px;
  display: flex;
  align-items: center;
`;
export const ThumnailText = styled.div`
  margin-left: 8px;
`;
export const ImageTitleWrapper = styled(ImageUploadInput)<ImageUploadInputProps>`
  height: ${({ height, error }) => height ? getImageUploadInputHeight(`${height}`, error) : '276px'};
  display: flex;
  justify-content: center;
  align-items: center;
`;
