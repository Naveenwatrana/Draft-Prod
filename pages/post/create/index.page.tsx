import { useIsMobile } from 'common/hooks/useIsMobile';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import MobileCreatePost from './mobile';
import DesktopCreatePost from './desktop';
import { Container } from './styles';

const Post = () => {
  const isMobile = useIsMobile();
  return (
    <Container>
      <ToastContainer
        position="top-center"
        hideProgressBar
        style={{
          width: '100%',
          maxWidth: '906px',
        }}
      />
      {isMobile ? <MobileCreatePost /> : <DesktopCreatePost />}
    </Container>
  );
};

export default Post;
