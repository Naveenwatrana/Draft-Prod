import TextComp from 'components/textComp';
import styled from 'styled-components';

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 16px 10px;
  gap: 16px;
`;

export const CardStackIconContainer = styled.div<{ hideElement?: boolean }>`
  ${({ hideElement }) => hideElement && 'display: none;'}
  flex: 2;
`;

export const CardStackIconWrapper = styled.div`
  background: #171718; //TODO: Get color from theme
  border-radius: 8px;
  padding: 5px 10px;
  margin-right: 10px;
  width: min-content;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const CardType = styled(TextComp)<{ hideElement?: boolean }>`
  border: 1px solid #ffffff; //TODO: Get color from theme
  border-radius: 8px;
  padding: 5px 10px;
  min-width: 50px;
  text-align: center;
  font-size: 0.86em;
  font-weight: 600;
  ${({ hideElement }) => hideElement && 'display: none;'}
`;

export const CardIcon = styled.div<{ hideElement?: boolean }>`
  min-width: 55px;
  min-height: 45px;
  ${({ hideElement }) => hideElement && 'display: none;'}
`;
