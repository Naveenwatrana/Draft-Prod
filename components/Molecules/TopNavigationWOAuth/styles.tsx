import BorderedButton from 'components/Atoms/BorderButton';
import styled from 'styled-components';

export const Navbar = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  justify-content: space-between;
  padding: 20px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray['40'].value};
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  height: 26px;
`;

export const Button = styled(BorderedButton)`
  padding: 12px 16px;
`;
export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;
