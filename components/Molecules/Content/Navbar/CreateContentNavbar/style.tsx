import styled from 'styled-components';
import {
  Container as StyledContainer,
  CreateArticleText as StyledCreateArticleText,
  IconWrapper as StyledIconWrapper,
} from '../style';

export const Container = styled(StyledContainer)`
  background-color: #121112; // TODO: Add Color
  border-color: #282629; // TODO: Add Color
  z-index: 3;
`;

export const CreateArticleText = styled(StyledCreateArticleText)`
  font-weight: 500;
`;
export const IconWrapper = styled(StyledIconWrapper)`
  border-color: #282629; // TODO: Add Color
`;
