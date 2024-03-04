import ChevronLeft from 'components/Icons/LeftChevron';
import SearchDark from 'components/Icons/SearchDark';
import TextComp from 'components/textComp';
import styled from 'styled-components';
import CancelIcon from 'components/Icons/CrossIcon';
import Divider from '../Divider/Divider';

type MiddlePartProps = {
  isActive: boolean;
};
type AvatarProps = {
  rectangle?: boolean;
  url?: string;
  size?: number;
}
export const DropDownDivider = styled(Divider)`
  margin: 4px 0;
`;

export const InputSearchIcon = styled(SearchDark)`
  position: absolute;
  left: 0;
  top: 8px;
  left: 8px;

  @media (max-width: 1023px) {
    top: 16px;
  }
  > * {
    stroke: ${({ theme }) => theme.palette.gray['20'].value};
    stroke-width: 1px;
  }
`;

export const CrossIcon = styled(CancelIcon)`
  position: absolute;
  top: 16px;
  right: -2.5rem;
  cursor: pointer;
  path {
    stroke: ${({ theme }) => theme.palette.gray['20'].value};
    stroke-width: 1px;
  }
  @media (max-width: 1023px) {
    top: 22px;
  }
`;

export const MiddlePartText = styled(TextComp)<MiddlePartProps>`
  font-weight: 600;
  font-size: 16px;
  line-height: 26px;
  cursor: pointer;
  font-family: var(--fonts-primary);
  padding: 10px;
  :hover {
    background-color: ${(props) => props.theme.palette.gray['50'].value};
  }
  background-color: ${(props) => props.isActive && props.theme.palette.gray['50'].value};
  border: ${(props) => props.isActive && `1px solid ${props.theme.palette.gray['40'].value}`};
  border-radius: 8px;
`;

export const MiddlePartTextMobile = styled(TextComp)<MiddlePartProps>`
  font-weight: 600;
  font-size: 16px;
  line-height: 26px;
  cursor: pointer;
  color: ${(props) => props.isActive ? props.theme.palette.white['100'].value : props.theme.palette.gray['30'].value};
`;

export const UserDropDown = styled.div`
  position: absolute;
  right: 10px;
  width: 224px;
  padding: 8px;
  border: 1px solid ${(props) => props.theme.palette.gray['40'].value};
  background: rgba(43, 44, 45, 0.85); // TODO: add color
  backdrop-filter: blur(16px);
  z-index: 90;
  border-radius: 8px;
  margin-top: 5px;
`;

export const DropDownItem = styled.div`
  color: ${(props) => props.theme.palette.white['100'].value};
  font-size: 14px;
  font-weight: 300;
  line-height: 20px;
  padding: 8px;
  font-family: ${({ theme }) => theme.defaultFont};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  svg {
    width: 18px;
  }
`;

export const UserDropDownItem = styled(DropDownItem)`
  &:hover {
    background-color: ${(props) => props.theme.palette.gray['80'].value};
    border-radius: 8px;
  }
`;

export const CompaniesContainer = styled.div`
  overflow: scroll;
  max-height: 50vh;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const LeftIcon = styled(ChevronLeft)`
  margin-right: 8px;
`;

export const RightIcon = styled(LeftIcon)`
  transform: rotate(180deg);
  margin-left: 8px;
  margin-right: 0px;

`;

export const Avatar = styled.span<AvatarProps>`
  width: ${({ size }) => size ? size : 30.909}px !important;
  height: ${({ rectangle, size }) => size || (rectangle ? 45.66 : 30.909)}px;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.palette.violet['80'].value};
  background-image: url(${({ url }) => url || ''});
  background-size: cover;
  color: ${({ theme }) => theme.palette.white['100'].value};
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
  cursor: pointer;
  border: solid 1px ${({ theme }) => theme.palette.gray['40'].value};
  font-weight: ${(props) => props.theme.typography['16 semibold'].fontWeight};
  font-size: ${(props) => (props.size && (props.size / 3)) || props.theme.typography['16 semibold'].fontSize.value}px;
`;

export const ProfileAvatar = styled(Avatar)`
  background-color: ${({ theme }) => theme.palette.white['100'].value};
  color: ${({ theme }) => theme.palette.gray['100'].value};
`;

export const BottomBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background-color: ${({ theme }) => theme.palette.gray['80'].value};
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.palette.gray['40'].value};
  align-items: center;
  padding: 20px 16px;
  z-index: 10;
`;

export const BottomBarItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const Navbar = styled.div`
display: flex;
background-color: ${({ theme }) => theme.palette.gray['80'].value};
justify-content: space-between;
padding: 20px 16px;
align-items: center;
position: fixed;
top: 0;
left: 0;
right: 0;
z-index: 2;
height: 26px;
`;

export const MiddlePart = styled.div`
display: flex;
justify-content: end;
align-items: center;
gap: 16px;
> svg:first-child {
  cursor: pointer;
}
`;

export const SearchContainer = styled.div`
width: 399px;
position: relative;

@media (max-width: 1300px) {
    width: 320px;
}
@media (max-width: 1200px) {
    width: 150px;
}
`;

export const SearchInput = styled.input`
line-height: 24px;
border: 2px solid transparent;
border-radius: 8px;
padding: 12px;
background: ${({ theme }) => theme.palette.gray['100'].value};
color: ${({ theme }) => theme.palette.white['100'].value};
font-weight: ${({ theme }) => theme.typography['14 regular'].fontWeight};
font-size: ${({ theme }) => theme.typography['14 regular'].fontSize.value}px;
width: 100%;
padding-left: 40px;
height: 18px;
border: 1px solid ${({ theme }) => theme.palette.gray[40].value};

&:focus {
    outline-color: ${({ theme }) => theme.palette.gray['40'].value};
}
`;
export const Button = styled.button`
  background: none;
  border: none;
`;
export const LeftSideContainer = styled.div`
  width: 23%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const RightPart = MiddlePart;

export const ApplicationSearchContainer = styled(SearchContainer)`
  width: 270px;
`;

export const ApplicationSearchInput = styled(SearchInput)`
  width: 227px;
  background: ${({ theme }) => theme.palette.gray['50'].value};
`;

export const ApplicationsCrossIcon = styled(CancelIcon)`
  position: absolute;
  top: 14px;
  right: 0rem;
  cursor: pointer;
  path {
    stroke: ${({ theme }) => theme.palette.gray['20'].value};
    stroke-width: 1px;
  }
  @media (max-width: 1023px) {
    top: 22px;
  }
`;
