import React from 'react';
import { extractGithubUsername } from 'pages/api/link/utils';
import lang from 'common/lang';
import { LinkBlockProps } from './type';
import {
  Container, Wrapper, ImgContainer, Title, MoreBtnContainer, Description, InfoContainer, TitleContainer,
} from './style';
import GithubBlock from '../Blocks/GithubBlock';

const {
  profile: {
    link: {
      editLinkForm: {
        moreBtnLabel,
      },
    },
  },
} = lang;
const LinkBlock = ({
  data, setEditBlock, editOnClick, width, height,
}: LinkBlockProps) => {
  const maxHeightLength = width === 1 && height === 2;
  const maxWidthLength = width === 2 && height === 1;
  const minLength = width === 1 && height === 1;
  const maxLength = width === 2 && height === 2;
  const isGithub = extractGithubUsername(data.url || '');
  if (isGithub) {
    return <Container maxLength={maxHeightLength} data-testid="gitBlock" href={data.url || ''} target="_blank"><GithubBlock minLength={minLength} maxLength={maxWidthLength} gitBlockTitle={data.title} gitBlockDescription={data.description} username={isGithub} /></Container>;
  }
  return (
    <Container data-testid="linkBlock" href={data.domain || data?.url || ''} target="_blank">
      <Wrapper minLength={minLength} maxLength={maxWidthLength}>
        {data?.media && (
          <ImgContainer
            minLength={minLength}
            maxLength={maxWidthLength}
            src={data.media}
            data-testid="linkImage"
          />
        )}
        <InfoContainer minLength={minLength} maxLength={maxWidthLength}>
          <TitleContainer>
            {data?.title && <Title data-testid="linkBlockTitle">{data.title}</Title>}
            {data?.description && (
              <Description
                minLength={minLength}
                maxLength={maxWidthLength}
                data-testid="linkBlockDescription"
              >
                {data.description}
              </Description>
            )}
          </TitleContainer>
          <MoreBtnContainer data-testid="DiscoverButton" minLength={minLength} maxLength={((maxLength) || (maxHeightLength))}>
            {data.button || moreBtnLabel}
          </MoreBtnContainer>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default LinkBlock;
