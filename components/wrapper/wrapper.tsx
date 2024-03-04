import React, { ReactNode } from 'react';
import { StoryWrapperContainer } from './styles';

type Props = {
  children: ReactNode
};

export const StoryWrapper = ({ children }: Props) => {
  return (
    <StoryWrapperContainer>
      {children}
    </StoryWrapperContainer>
  );
};

export default StoryWrapper;
