import lang from 'common/lang';
import { useMemo, useState } from 'react';
import Popup from 'pages/company/ActionSection/Popup';
import { useNavigate } from 'common/utils/router-fill';
import { createJob, createLink } from 'common/utils/network/appRouts';
import ArticlesIcon from 'components/Molecules/CreateContent/articles.svg';
import PostsIcon from 'components/Molecules/CreateContent/posts.svg';
import JobsIcon from 'components/Molecules/CreateContent/job.svg';
import LinkIcon from 'components/Molecules/CreateContent/link.svg';
import { useAppSelector } from 'common/hooks/state';
import { selectCurrentCompany } from 'pages/account/authSlice';
import { Button, MiddlePartTextMobile } from './styles';
import { CreateMenuItem } from './types';

const { navBarText } = lang;
const {
  post, postDescription, article, articleDescription, job, jobDescription, link, linkDescription,
} = lang.createContent;

const CreateMenuItem = ({ pathName }: CreateMenuItem) => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const positions = {
    right: '0px', left: 'auto', top: 'auto', bottom: 'auto',
  };
  const currentCompany = useAppSelector(selectCurrentCompany);
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
    <>
      <Button type="button" onClick={() => setOpenMenu(true)}>
        <MiddlePartTextMobile isActive={pathName.includes('community')}>
          {navBarText.create}
        </MiddlePartTextMobile>
      </Button>

      <Popup
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        positions={positions}
        items={popupItems}
      />

    </>
  );
};

export default CreateMenuItem;
