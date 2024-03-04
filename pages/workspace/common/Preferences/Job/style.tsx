import styled from 'styled-components';

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StyledTooltip = styled.div`
  > .react-tooltip {
    max-width: 450px;
    @media screen and (max-width: 435px) {
      max-width: calc(100% - 96px);
    }
  }
`;
