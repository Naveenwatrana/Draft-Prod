import { useNavigate } from 'common/utils/router-fill';
import lang from 'common/lang';
import Loader from 'components/Loader/Loader';
import { usePublishArticleMutation, useUserArticlesQuery } from 'pages/article/articleService';
import { ISavedCard } from 'pages/workspace/type';
import React, {
  useState,
} from 'react';
import { useAppSelector } from 'common/hooks/state';
import { selectCurrentCompany } from 'pages/account/authSlice';
import NoCards from './NoCards';
import {
  Content, NoContent, Container,
} from './styles';
import CreatedCard from './UserCreatedCards';

const {
  cards: { createCards },
} = lang;

const CreatedCards = () => {
  const [page] = useState(1);
  const currentCompany = useAppSelector(selectCurrentCompany);
  const { data, isLoading } = useUserArticlesQuery({ username: currentCompany?.username, page });
  const [publishArticleApi, { isSuccess: success, isLoading: load }] = usePublishArticleMutation();
  const navigate = useNavigate();
  const cards: ISavedCard[] = data?.data?.data;

  if (cards?.length === 0) {
    return (
      <NoContent>
        <NoCards />
      </NoContent>
    );
  }
  if (isLoading) {
    return <Loader />;
  }
  const handlePublish = async (publishedDate: string | null, id: number) => {
    const publishForCompany = currentCompany?.username ? { company: currentCompany?.username } : {};
    await publishArticleApi({ id, data: { publish: !publishedDate, ...publishForCompany } });
  };

  return (
    <Container>
      {(load) && <Loader />}
      <Content>
        {cards?.map((card) => (
          <CreatedCard key={card.id} card={card} handlePublish={handlePublish} success={success} />
        ))}
      </Content>
    </Container>
  );
};

export default CreatedCards;
