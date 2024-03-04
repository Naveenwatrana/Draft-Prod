import lang from 'common/lang';
import ModalElement from 'components/Modal/Modal';
import React from 'react';
import ButtonComp from 'components/buttonComp';
import {
  ContactUsContainer, FilterContainer, Header, Heading, SubHeadingPopup,
} from './style';
import { FindRolePopupProps } from './type';
const {
  jobs: {
    createJobSteps: {
      role: { cantFindRole },
    },
  },
} = lang;

const FindRolePopup = ({ isOpen, onClose }: FindRolePopupProps) => {
  return (
    <ModalElement
      isOpen={isOpen}
      centered
      position={2}
      shouldCloseOnOverlayClick
    >
      <FilterContainer>
        <Header>
          <Heading>{cantFindRole.title}</Heading>
          <SubHeadingPopup>{cantFindRole.desc}</SubHeadingPopup>
        </Header>
        <ContactUsContainer>
          <span>{cantFindRole.contactUsAt}</span>
          <a href={`mailto:${cantFindRole.draftUrl}`}>{cantFindRole.draftUrl}</a>
        </ContactUsContainer>
        <ButtonComp
          label={cantFindRole.close}
          variant="link"
          onClick={onClose}
        />
      </FilterContainer>
    </ModalElement>
  );
};

export default FindRolePopup;
