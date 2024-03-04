import ModalElement from 'components/Modal/Modal';
import React, { useRef } from 'react';
import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import PencilIcon from 'components/Icons/pencil.svg';
import TextComp from 'components/textComp';
import { IProjectsPayload } from '../types';
import {
  EditWrapper,
  ModalImageContainer,
  ProjectDetails,
  ProjectDuration,
  ProjectImage,
  ProjectImageContainer,
  ProjectTitle,
  SkillTag,
  SkillsContainer,
} from './styles';
import { MobileModalContainer, ProjectModalContainer, ProjectModalContent } from '../styles';

type ProjectModalMobileProps = {
  open: boolean;
  onClose: () => void;
  data: IProjectsPayload;
  date: string;
  onEdit: (e: any) => void;
};
const ProjectModalMobile = ({
  open,
  onClose,
  data,
  date,
  onEdit,
}: ProjectModalMobileProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter({ ref: wrapperRef, outSideClick: onClose });
  return (
    <ModalElement isOpen={open} closeModal={onClose} centered>
      <ProjectModalContainer ref={wrapperRef}>
        <MobileModalContainer>
          <ProjectDetails>
            <EditWrapper onClick={onEdit} data-cy={`editProject${data.id}`}>
              <PencilIcon width={16} />
            </EditWrapper>
            <ProjectTitle>{data.project_or_company}</ProjectTitle>
            <ProjectDuration>{date}</ProjectDuration>
          </ProjectDetails>
          <ProjectModalContent>
            <ModalImageContainer>
              {data?.project_images?.map((image) => (
                <ProjectImageContainer key={image.id}>
                  <ProjectImage src={image.image_path} />
                </ProjectImageContainer>
              ))}
            </ModalImageContainer>
          </ProjectModalContent>
        </MobileModalContainer>
        <TextComp component="h4">{data.description}</TextComp>
        <SkillsContainer expanded>
          {data?.tags?.map((tag) => (
            <SkillTag key={tag.id}>{tag.tag}</SkillTag>
          ))}
        </SkillsContainer>
      </ProjectModalContainer>
    </ModalElement>
  );
};

export default ProjectModalMobile;
