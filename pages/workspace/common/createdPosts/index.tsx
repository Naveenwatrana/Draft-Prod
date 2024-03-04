import { useNavigate } from 'common/utils/router-fill';
import lang from 'common/lang';
import Loader from 'components/Loader/Loader';
import { useUpdatePostMutation, useUserPostsQuery } from 'pages/posts/postsService';
import React, { useMemo, useState } from 'react';
import useCompany from 'common/hooks/useCompany';
import { ISavedCard } from 'pages/workspace/type';
import NotPosts from './NoCards';
import {
  Content, NoContent, Container,
} from './styles';
import CreatedPost from './UserCreatedPosts';
import { CreatedPostsProps } from './types';

const {
  posts: { createPosts },
} = lang;

const CreatedPosts = ({ cards }: CreatedPostsProps) => {
  const { currentCompany } = useCompany();
  const [skip, setSkip] = useState<boolean>(true);
  const { data, isLoading } = useUserPostsQuery(
    { username: currentCompany?.username, page: 1 },
    { skip },
  );
  const cardsToRender: ISavedCard[] = useMemo(() => data?.data?.data || cards, [cards, data?.data?.data]);
  const [publishPostApi, { isSuccess: success, isLoading: load }] = useUpdatePostMutation();
  const navigate = useNavigate();

  if (cardsToRender?.length === 0) {
    return (
      <NoContent>
        <NotPosts />
      </NoContent>
    );
  }
  const handlePublish = async (publishedDate: string | null, id: number) => {
    const publishForCompany = currentCompany?.username ? { company: currentCompany?.username } : {};
    await publishPostApi({ id, companyUsername: currentCompany?.username, body: { publish: !publishedDate, ...publishForCompany } });
    setSkip(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      {(load) && <Loader />}
      <Content>
        {cardsToRender?.map((card) => (
          <CreatedPost key={card.id} card={card} handlePublish={handlePublish} success={success} />
        ))}
      </Content>
    </Container>
  );
};

export default CreatedPosts;
