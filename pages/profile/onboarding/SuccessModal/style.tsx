import FlexBox from 'components/Atoms/Flexbox';
import TextComp from 'components/textComp';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 587px;
  padding: 32px;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  background-color: ${({ theme }) => theme.palette.gray[80].value};
  border: 1px solid ${({ theme }) => theme.palette.gray[40].value};
  border-radius: 12px;
  ${FlexBox} {
    width: 100%;
    justify-content: end;
    button {
      width: 179px;
      height: 50px;
    }
  }
  svg {
    /* width: 117px; */
    /* height: 117px; */
  }
`;

export const Content = styled.div`
  width: 515px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  text-align: center;
`;

export const LightText = styled(TextComp)`
  font-weight: 300;
  line-height: 26px;
  `;

export const BoldText = styled(TextComp)`
  line-height: 26px;
  font-weight: 700;
`;
