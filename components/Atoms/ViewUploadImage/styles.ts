import Image from 'next/image';
import styled from 'styled-components';
import { IconWrapper } from '../IconWrapper';

export const ViewImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;
export const ViewImageContainer = styled.div`
  overflow: hidden;
  border-radius: 24px;
  margin-bottom: 10px;
`;
export const ViewLinkImageContainer = styled(ViewImageContainer)`
  border-radius: 24px 24px 0 0; 
  margin-bottom: 0;
`;
export const ImageWithStyle = styled(Image)`
  width: 100%;
  height: max-content;
  border-radius: 24px;
`;
export const LinkImageWithStyle = styled(ImageWithStyle)`
  width: 100%;
  height: 288px;
  border-radius: 24px 24px 0 0;
  object-fit: cover;
`;
export const DeleteIcon = styled(IconWrapper)`
  position: absolute;
  top: 6px;
  right: 6px;
  border-radius: 16px;
  padding-left: 14px;
  padding-right: 14px;
  border: none;
  &:hover {
    outline: none;
  }
`;
