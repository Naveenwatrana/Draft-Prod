import TextComp from 'components/textComp';
import styled from 'styled-components';
import { Container as UploadMediaContainer } from 'components/ImageUpload/MediaUpload/style';

export const Container = styled.div`
  display: flex;
  width: 447px;
  padding: 32px;
  border-radius: 12px;
  background: #121112; // TODO: Add Color
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 16px;
  ${UploadMediaContainer} {
    height: 350px;
  }
`;

export const Title = styled(TextComp)`
  font-size: ${({ theme }) => theme.typography['20 semibold'].fontSize.value}px;
  font-weight: 500;
  line-height: 28px;
`;

export const SubTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SubText = styled(Title)`
  color: #a69dab; // TODO: Add Color
  font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
  font-weight: 400;
  line-height: 20px;
`;
