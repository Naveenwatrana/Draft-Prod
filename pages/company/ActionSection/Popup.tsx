import React, { useRef } from 'react';
import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import {
  ActionPopup,
  ActionPopupItem,
  AddBlockDesc,
  AddBlockTitle,
  AddBlockWrapper,
  PopupOverlay,
} from './style';
import { IItem, PopupProps } from './types';
const Popup = ({
  open, onClose, items, positions,
}: PopupProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter({
    ref: wrapperRef,
    outSideClick: onClose,
  });
  if (!open) {
    return null;
  }
  return (
    <>
      <PopupOverlay />
      <ActionPopup ref={wrapperRef} positions={positions}>
        {items && items.map((item: IItem) => (
          <ActionPopupItem data-cy={`Create-${item.title}`} key={item.id} onClick={item.onClick}>
            {item?.icon && <item.icon />}
            <AddBlockWrapper>
              <AddBlockTitle>{item.title}</AddBlockTitle>
              <AddBlockDesc>{item.description}</AddBlockDesc>
            </AddBlockWrapper>
          </ActionPopupItem>
        ))}
      </ActionPopup>
    </>
  );
};

export default Popup;
