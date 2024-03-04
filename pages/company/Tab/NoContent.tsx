import NoContentIcon from 'components/Icons/NoContentIcon';
import React from 'react';
import lang from 'common/lang';
import {
  AddFirstContentText,
  NoContentIconContainer,
  NoContentText,
  NoContentWrapper,
} from './styles';
const {
  company: { contentNotFound, contentNotFoundMessage },
} = lang;

const NoContent = () => {
  return (
    <NoContentWrapper>
      <NoContentIconContainer data-cy="no-content-icon">
        <NoContentIcon />
      </NoContentIconContainer>
      <NoContentText data-cy="no-content-title">{contentNotFound}</NoContentText>
      <AddFirstContentText data-cy="no-content-subtitle">
        {contentNotFoundMessage}
      </AddFirstContentText>
    </NoContentWrapper>
  );
};

export default NoContent;
