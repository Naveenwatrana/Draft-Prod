import {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { theme } from 'common/theme';
import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import {
  IconButton,
  KebabMenuWrapper, List, Menu,
} from './styles';
import { KebabMenuProps } from './types';

const KebabMenu = ({
  list, closeMenu, position = 'bottom', icon, horizontalPosition,
}: KebabMenuProps) => {
  const [active, setActive] = useState(false);
  const toggleMenu = () => {
    setActive(!active);
  };
  useEffect(() => {
    setActive(false);
  }, [closeMenu]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter({ ref: wrapperRef, outSideClick: () => setActive(false) });
  const handleToggle = () => {
    toggleMenu();
  };
  const childrenCount = useMemo(() => {
    if (typeof list.props.children === 'string') {
      return 1;
    }
    if (typeof list.props.children === 'object') {
      return list.props.children.length;
    }
    return 0;
  }, [list.props.children]);
  return (
    <KebabMenuWrapper ref={wrapperRef}>
      {!icon && (
        <IconButton type="button" onClick={handleToggle}>
          <svg data-testid="toggleMenu" data-cy="toggleMenu" width="27" height="12">
            <circle cx="8" cy="6" r="2" fill={theme.palette.green['100'].value} />
            <circle cx="14" cy="6" r="2" fill={theme.palette.green['100'].value} />
            <circle cx="20" cy="6" r="2" fill={theme.palette.green['100'].value} />
          </svg>
        </IconButton>
      )}
      {icon && <IconButton type="button" onClick={handleToggle}>{icon}</IconButton>}
      <Menu horizontalPosition={horizontalPosition} position={position} items={childrenCount} isActive={active} data-cy="articleMenu" data-testid="articleMenu">
        <List>
          {list}
        </List>
      </Menu>
    </KebabMenuWrapper>
  );
};

export default KebabMenu;
