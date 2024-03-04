import ModalElement from 'components/Modal/Modal';
import React, { useRef } from 'react';
import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import PencilIcon from 'components/Icons/pencil.svg';
import TextComp from 'components/textComp';
import lang from 'common/lang';
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
import { ProjectModalContainer, ProjectModalContent } from '../styles';

type ProjectModalProps = {
  open: boolean;
  onClose: () => void;
  data: IProjectsPayload;
  date: string;
  onEdit: (e: any) => void;
  isEditable: boolean;
};
const {
  buttonText: { edit },
} = lang;
const ProjectModal = ({
  open,
  onClose,
  data,
  date,
  onEdit,
  isEditable = false,
}: ProjectModalProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter({ ref: wrapperRef, outSideClick: onClose });
  return (
    <ModalElement isOpen={open} closeModal={onClose} centered>
      <ProjectModalContainer ref={wrapperRef}>
        <ProjectDetails isOpen={open}>
          <ProjectTitle>{data.project_or_company}</ProjectTitle>
          <ProjectDuration>{date}</ProjectDuration>
          {isEditable && (
            <EditWrapper onClick={onEdit} data-cy={`editProject${data.id}`}>
              <PencilIcon width={16} />
              <span>{edit}</span>
            </EditWrapper>
          )}
        </ProjectDetails>
        <ProjectModalContent>
          <ModalImageContainer>
            {data?.project_images?.map((image) => (
              <ProjectImageContainer key={image.id}>
                <ProjectImage src={image.image_path} />
              </ProjectImageContainer>
            ))}
          </ModalImageContainer>
          <SkillsContainer expanded>
            {data?.tags?.map((tag) => (
              <SkillTag key={tag.id}>{tag.tag}</SkillTag>
            ))}
          </SkillsContainer>
          <TextComp component="pAlt">{data.description}</TextComp>
        </ProjectModalContent>
      </ProjectModalContainer>
    </ModalElement>
  );
};

export default ProjectModal;
