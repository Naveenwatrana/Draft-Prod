import styled from 'styled-components';

type TagsLoaderContainerProps = {
    isLoading: boolean;
  }

export const TagsLoaderContainer = styled.span<TagsLoaderContainerProps>`
    visibility: ${({ isLoading }) => isLoading ? 'visible' : 'hidden'}
  `;
