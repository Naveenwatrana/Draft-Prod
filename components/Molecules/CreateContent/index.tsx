import CreateButton from 'components/Atoms/CreateButton';
import Popup from 'pages/company/ActionSection/Popup';
import {
  useCallback, useMemo, useRef, useState,
} from 'react';
import lang from 'common/lang';
import { useNavigate } from 'common/utils/router-fill';
import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import { useAppSelector } from 'common/hooks/state';
import { selectCurrentCompany } from 'pages/account/authSlice';
import { createJob, createLink } from 'common/utils/network/appRouts';
import { Container } from './styles';
import { CreateContentButtonProps } from './types';
import ArticlesIcon from './articles.svg';
import PostsIcon from './posts.svg';
import JobsIcon from './job.svg';
import LinkIcon from './link.svg';

const {
  post, postDescription, article, articleDescription, job, jobDescription, link, linkDescription,
} = lang.createContent;

const CreateContentButton = ({
  positions = {
    right: '0px', left: 'auto', top: 'auto', bottom: 'auto',
  },
}: CreateContentButtonProps) => {
  const [open, isOpen] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const currentCompany = useAppSelector(selectCurrentCompany);
  const handleClick = useCallback(() => {
    isOpen(false);
  }, [isOpen]);

  useOutsideAlerter({
    ref: wrapperRef,
    outSideClick: handleClick,
  });
  const popupItems = useMemo(() => {
    const jobItem = {
      id: 3,
      title: job,
      description: jobDescription,
      onClick: () => navigate(createJob),
      icon: JobsIcon,
    };
    const linkItem = {
      id: 4,
      title: link,
      description: linkDescription,
      onClick: () => navigate(createLink),
      icon: LinkIcon,
    };
    const items = [
      {
        id: 1,
        title: post,
        description: postDescription,
        onClick: () => navigate('/post/create'),
        icon: PostsIcon,
      },
      {
        id: 2,
        title: article,
        description: articleDescription,
        onClick: () => navigate('/article/create'),
        icon: ArticlesIcon,
      },
    ];
    if (currentCompany?.id) {
      items.push(jobItem);
    }
    items.push(linkItem);
    return items;
  }, [currentCompany?.id, navigate]);
  return (
    <Container ref={wrapperRef}>
      <CreateButton onClick={() => isOpen(!open)} active={open} />
      <Popup
        open={open}
        onClose={() => undefined}
        positions={positions}
        items={popupItems}
      />
    </Container>
  );
};

export default CreateContentButton;
