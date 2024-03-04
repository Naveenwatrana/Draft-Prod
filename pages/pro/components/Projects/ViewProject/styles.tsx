import styled from 'styled-components';
import { ProjectDescriptionProps } from 'pages/pro/components/Projects/ViewProject/types';
import TextComp from 'components/textComp';
import { ActionIconsContainer, IconsContainer } from 'pages/pro/styles';

type SkillsContainerProps = {
  expanded?: boolean;
}

type SkillTagProps = {
  clickable?: boolean;
  selected?: boolean;
}

type ProjectDetailsProps = {
  isOpen?: boolean;
}
type WrapperProps = {
  isActive?: boolean;
}

export const Container = styled.div`
  width: calc(100% - 32px);
  @media (min-width: 1024px) {
    width: 100%;
  }
`;

export const DesktopWrapper = styled.div<WrapperProps>`
    color: ${(props) => props.theme.palette.white[100].value};
    padding: 16px;
    border-radius: 8px;
    @media (min-width: 1024px) {
      padding: 0;
    }
    width: 100%;
  border: ${(props) => props.isActive && `solid 1px ${props.theme.palette.gray[20].value}`};
`;

export const ProjectTitle = styled.h3`
  font-weight: ${(props) => props.theme.typography['20 semibold'].fontWeight};
  font-size: ${(props) => props.theme.typography['20 semibold'].fontSize.value}px;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const ProjectDuration = styled.p`
  font-weight: ${(props) => props.theme.typography['12 regular'].fontWeight};
  font-size: ${(props) => props.theme.typography['12 regular'].fontSize.value}px;
  color: ${(props) => props.theme.palette.gray[10].value};
  margin-top: 6px;
  margin-top: 16px;
`;
export const ProjectDescription = styled.div<ProjectDescriptionProps>`
  font-weight: ${(props) => props.theme.typography['14 regular'].fontWeight};
  font-size: ${(props) => props.theme.typography['14 regular'].fontSize.value}px;
  line-height: ${(props) => props.theme.typography['14 regular'].lineHeights.value};
  color: ${(props) => props.theme.palette.white[100].value};
  margin-top: 16px;
  white-space: pre-wrap;
  word-break: break-word;
  overflow: hidden;
  position: relative;
  line-height: 20px;
  max-height: 140px;
  width: 100%;
  text-align: justify;
  margin-right: -1rem;
  padding-right: 1rem;
  :before {
    content: '   ';
    position: absolute;
    bottom: 0;
    right: 1rem;
    background: ${(props) => props.theme.palette.gray[60].value};
  }
  :after {
    content: '';
    position: absolute;
    right: 1rem;
    width: 1rem;
    height: 1rem;
    margin-top: 0.2rem;
    background: ${(props) => props.theme.palette.gray[60].value};
    z-index: 2;
  }
  `;
export const Wrapper = styled(DesktopWrapper)`
  background: ${(props) => props.isActive
    ? props.theme.palette.gray[50].value
    : props.theme.palette.gray[60].value};
  ${ProjectDescription} {
    :before {
      background: ${(props) => props.isActive
    ? props.theme.palette.gray[50].value
    : props.theme.palette.gray[60].value};
    }
    :after {
      background: ${(props) => props.isActive
    ? props.theme.palette.gray[50].value
    : props.theme.palette.gray[60].value};
    }
  }
  width: calc(100% - 32px);
`;
export const MoreDesc = styled.span`
  align-self: flex-end;
  font-weight: ${(props) => props.theme.typography['14 regular'].fontWeight};
  font-size: ${(props) => props.theme.typography['14 regular'].fontSize.value}px;
  color: ${(props) => props.theme.palette.white[100].value};
  z-index: 1;
  margin-left: -9px;
  cursor: pointer;
`;

export const DescriptionContainer = styled.span`
  display: flex;
`;

export const SkillTag = styled.span<SkillTagProps>`
    border: solid 1px rgba(84, 171, 172, 0.50); // TODO: Add Color
    cursor: ${({ clickable }) => clickable && 'pointer'} ;
    padding: 8px 10px;
    border-radius: 8px;
    font-size: ${({ theme }) => theme.typography['14 semibold'].fontSize.value}px;
    font-weight: ${({ theme }) => theme.typography['14 semibold'].fontWeight};
    line-height: ${({ theme }) => theme.typography['14 semibold'].lineHeights.value}px;
    background-color: ${({ selected }) => selected ? '#54ABAC' : 'transparent'}; // TODO: Add Color
    color: ${({ theme, selected }) => selected ? theme.palette.gray[80].value : theme.palette.white[100].value};
`;

export const SkillsContainer = styled.span<SkillsContainerProps>`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 8px;
    margin: 16px 0 32px;
`;

export const Box = styled.div`
  display: flex;
  width: 100%;
`;
export const EditIcon = styled(Box)`
  justify-content: flex-end;
`;
export const ProjectImageContainer = styled.div`
  overflow: hidden;
  img {
    border-radius: 12px;
    width: 276px !important;
    height: 370px !important;
    object-fit: cover;
  }
  @media (max-width: 1023px) {
    margin-top: 8px;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
  }
`;
export const NewProjectIcon = styled(Box)`
  align-items: center;
`;
export const ProjectImage = styled.img`
  width: 100%;
`;
export const ProjectHead = styled(Box)`
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.palette.white['100'].value}
`;
export const Title = styled.span`
    font-weight: ${(props) => props.theme.typography['20 semibold'].fontWeight};
    font-size: ${(props) => props.theme.typography['20 semibold'].fontSize.value}px;
    white-space: pre-wrap;
    word-break: break-word;
`;
export const ProjectsHeader = styled(Box)`
  justify-content: space-between;
`;
export const ProjectBox = styled.div`
  background: ${(props) => props.theme.palette.gray[60].value};
  border: solid 1px ${({ theme }) => theme.palette.gray['40'].value};
  border-radius: 8px;
  padding: 24px;
  width: 100%;
  display: flex;
  gap: 32px;
  :hover {
    background: ${({ theme }) => theme.palette.gray['50'].value};
    ${ProjectDescription} {
      :before {
        background: ${(props) => props.theme.palette.gray[50].value};
      }
      :after {
        background: ${(props) => props.theme.palette.gray[50].value};
      }
    }
  }
  @media screen and (min-width: 1023px) {
    :hover {
      ${IconsContainer} {
        display: flex;
      }
      ${ActionIconsContainer} {
        display: flex;
      }
    }
  }
  position: relative;
`;
export const ProjectsMeta = styled(Box)`
  justify-content: space-between;
`;

export const DetailsContainer = styled(TextComp)<ProjectDescriptionProps>`
  width: 100%;
  @media (max-width: 768px) {
    width: 120px;
  }
`;

export const ProjectDetails = styled.div<ProjectDetailsProps>`
  width: ${({ isOpen }) => !isOpen && 'calc(100%)'};
  margin-right: 10px;
`;

export const AddProjectIcon = styled.span`
    font-weight: ${(props) => props.theme.typography['12 semibold'].fontWeight};
    font-size: ${(props) => props.theme.typography['12 semibold'].fontSize.value}px;
    margin-left: 9px;
    `;

export const EditWrapper = styled.span`
  display: flex;
  gap: 8px;
  color: ${(props) => props.theme.palette.green[80].value};
  font-weight: ${(props) => props.theme.typography['12 semibold'].fontWeight};
  font-size: ${(props) => props.theme.typography['12 semibold'].fontSize.value}px;
  margin-top: 8px;
`;

export const ModalImageContainer = styled.span`
  display: flex;
  gap: 16px;
  justify-content: flex-start;
  > * {
    margin-top: 0;
  }
`;
