import styled from 'styled-components';
import Image from 'next/image';
import TextComp from 'components/textComp';

export const SlideWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
`;

export const ImageContainerHeader = styled(TextComp)`
  font-weight: ${(props) => props.theme.typography['14 semibold'].fontWeight};
  font-size: ${(props) => props.theme.typography['14 semibold'].fontSize.value}px;
  line-height: ${(props) => props.theme.typography['14 semibold'].lineHeight};
  position: absolute;
  padding: 15px;
  z-index: 1;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

export const Mantra = styled(TextComp)`
  font-weight: ${(props) => props.theme.typography['20 regular'].fontWeight};
  font-size: ${(props) => props.theme.typography['20 regular'].fontSize.value}px;
  line-height: ${(props) => props.theme.typography['20 regular'].lineHeight};
  position: absolute;
  top: 50px;
  padding: 15px;
  z-index: 1;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

export const ImagePreview = styled(Image)`
  padding-top: 25px;
`;

export const BioWrapper = styled(TextComp)`
  font-weight: ${(props) => props.theme.typography['16 regular'].fontWeight};
  font-size: ${(props) => props.theme.typography['16 regular'].fontSize.value}px;
  line-height: ${(props) => props.theme.typography['16 regular'].lineHeight};
  position: absolute;
  top: 50px;
  padding: 15px;
  z-index: 1;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

export const ProjectItem = styled.div`
  position: relative;
  top: 50px;
  left: 0;
  right: 0;
  height: fit-content;
  margin: auto;
  padding: 15px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Company = styled(TextComp)`
font-weight: ${(props) => props.theme.typography['14 semibold'].fontWeight};
font-size: ${(props) => props.theme.typography['14 semibold'].fontSize.value}px;
`;

export const Role = styled(TextComp)`
font-weight: ${(props) => props.theme.typography['14 regular'].fontWeight};
font-size: ${(props) => props.theme.typography['14 regular'].fontSize.value}px;
`;

export const Duration = styled(TextComp)`
font-weight: ${(props) => props.theme.typography['14 regular'].fontWeight};
font-size: ${(props) => props.theme.typography['14 regular'].fontSize.value}px;
color: ${(props) => props.theme.palette.white['30'].value};
`;
