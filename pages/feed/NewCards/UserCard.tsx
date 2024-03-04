import React from 'react';
import { SkillSection } from 'components/Organisms/ProfileBio/style';
import { SkillTag } from 'components/Atoms/SkillTag/styles';
import {
  UserCardBio, UserCardBlock, UserCardLocation, UserCardName, UserImage,
} from './style';
type UserCardsProps = {
  data: {
    tags: string[];
    username: string;
    location: string;
    bio: string;
    UserImage: string;
  };
};

const UserCards = ({
  data,
}: UserCardsProps) => {
  return (
    <UserCardBlock>
      <UserImage src={data.UserImage} width={64} height={64} alt={data.username} />
      <UserCardName component="h4">{data.username}</UserCardName>
      <UserCardLocation component="p">{data.location}</UserCardLocation>
      <UserCardBio component="p">{data.bio}</UserCardBio>
      <SkillSection>
        {data.tags.map((skill: string) => (
          <SkillTag key={skill}>{skill}</SkillTag>
        ))}
      </SkillSection>
    </UserCardBlock>
  );
};

export default UserCards;
