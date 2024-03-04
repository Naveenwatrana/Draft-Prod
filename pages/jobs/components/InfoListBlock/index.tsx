import React from 'react';
import lang from 'common/lang';
import TextComp from 'components/textComp';
import { PlaceHolderText } from 'pages/workspace/common/jobApplicationsDesktop/styles';
import { BulletPointContainer } from 'components/Molecules/Jobs/WhoYouAre/style';
import {
  ListContainer, Title,
} from './style';

const InfoListBlock = ({
  title, list, onClick, isAuthor = false,
}:{title: string, list: string[], onClick?:()=>void, isAuthor: boolean }) => {
  return (
    <ListContainer isAuthor={isAuthor} onClick={onClick}>
      <Title>
        {title}
      </Title>
      {list.length > 0 ? (
        <BulletPointContainer>
          {list?.filter((requirement) => requirement).map((requirement, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index + requirement} data-cy={`requirement-${index}`}>
              <TextComp component="h4">{requirement}</TextComp>
            </li>
          ))}
        </BulletPointContainer>
      ) : <PlaceHolderText>{`+ Add ${title}`}</PlaceHolderText>}
    </ListContainer>
  );
};

export default InfoListBlock;
