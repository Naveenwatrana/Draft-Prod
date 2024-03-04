import { useHandleMissingSession } from 'common/hooks/useHandleMissingSession';
import React from 'react';
import CreateArticleDesktop from './CreateArticleDesktop';
const AddArticle = () => {
  useHandleMissingSession();
  return <CreateArticleDesktop />;
};

export default AddArticle;
