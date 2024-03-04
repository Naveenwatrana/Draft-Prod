import React, { useEffect, useState } from 'react';
import NewsFeedIcon from 'components/Icons/NewsFeedIcon';
import { CollapsibleMenuItem, SideBarItem } from './styles';
type CollapsibleMenuItemProps = {
  selected: boolean;
  onClick: () => void;
  items: string[];
  title: string;
  onSelectItem: (item: string) => void;
  selectedItem: string;
};
const CollapsibleMenu = ({
  selected,
  onClick,
  items,
  title,
  onSelectItem,
  selectedItem,
}: CollapsibleMenuItemProps) => {
  const [collapse, setCollapse] = useState<boolean>(false);

  useEffect(() => {
    if (selected) setCollapse(false);
  }, [selected]);

  const handleClick = () => {
    onClick();
    setCollapse(!collapse);
  };

  const handleSelectItem = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: string,
  ) => {
    e.stopPropagation();
    onSelectItem(item);
  };

  return (
    <SideBarItem selected={selected} onClick={handleClick} data-cy={title}>
      <span>
        <NewsFeedIcon />
        {title}
      </span>
      {selected
        && !collapse
        && items.map((item: string) => (
          <CollapsibleMenuItem
            key={`collapsible-${item}`}
            data-cy={`collapsible${item}`}
            active={selectedItem === item}
            onClick={(e) => handleSelectItem(e, item)}
          >
            {item}
          </CollapsibleMenuItem>
        ))}
    </SideBarItem>
  );
};

export default CollapsibleMenu;
