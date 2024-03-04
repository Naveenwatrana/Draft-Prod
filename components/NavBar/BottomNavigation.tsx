import lang from 'common/lang';
import { Feed } from 'components/Icons/Feed';
import { Workspace } from 'components/Icons/Workspace';
import PlusIcon from 'components/Icons/PlusIcon';
import { theme } from 'common/theme';
import { useLocation, useNavigate } from 'common/utils/router-fill';
import { BottomBar, BottomBarItem, MiddlePartTextMobile } from './styles';
import CreateMenuItem from './CreateMenuItem';

const { navBarText } = lang;

const BottomNavigation = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const navigate = useNavigate();
  const isFeedSelected = pathName.includes('feed') ? theme.palette.white['100'].value : theme.palette.gray['30'].value;
  const isWorkspaceSelected = pathName.includes('workspace') ? theme.palette.white['100'].value : theme.palette.gray['30'].value;
  const isCommunitySelected = pathName.includes('community') ? theme.palette.white['100'].value : theme.palette.gray['30'].value;

  return (
    <BottomBar>
      <BottomBarItem
        onClick={() => navigate('/feed')}
        onKeyDown={() => navigate('/feed')}
      >
        <Feed
          color={isFeedSelected}
        />
        <MiddlePartTextMobile isActive={pathName.includes('feed')}>
          {navBarText.feed}
        </MiddlePartTextMobile>
      </BottomBarItem>
      <BottomBarItem>
        <PlusIcon
          size={20}
          color={isCommunitySelected}
        />
        <CreateMenuItem pathName={pathName} />
      </BottomBarItem>
      <BottomBarItem
        onClick={() => navigate('/workspace')}
        onKeyDown={() => navigate('/workspace')}
      >
        <Workspace
          color={isWorkspaceSelected}
        />
        <MiddlePartTextMobile isActive={pathName.includes('workspace')}>
          {navBarText.workspace}
        </MiddlePartTextMobile>
      </BottomBarItem>
    </BottomBar>
  );
};

export default BottomNavigation;
