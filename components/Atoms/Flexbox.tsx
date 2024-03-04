import styled from 'styled-components';

type FlexBoxProps = { justify?: string };

const FlexBox = styled.div<FlexBoxProps>`
  display: flex;
  width: 100%;
  justify-content: ${({ justify }) => justify && justify};
`;

export default FlexBox;
