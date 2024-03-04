/* eslint-disable react/jsx-no-useless-fragment */
import React, { useRef } from 'react';
import HighlightBlockIcon from 'components/Icons/HighlightBlockIcon';
import lang from 'common/lang';
import TextBlockIcon from 'components/Icons/TextBlockIcon';
import { AddBlockType } from 'pages/pro/types';
import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import {
  ActionPopup,
  ActionPopupItem,
  AddBlockDesc,
  AddBlockTitle,
  AddBlockWrapper,
  CrossIconWrapper,
} from './style';
const {
  profile: { block, link },
} = lang;
type PopupProps = {
  open: boolean;
  onClose: () => void;
  onBlockTypeChange: (type: number) => void;
};
const Popup = ({ open, onClose, onBlockTypeChange }: PopupProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter({
    ref: wrapperRef,
    outSideClick: onClose,
  });
  return open ? (
    <ActionPopup ref={wrapperRef}>
      <CrossIconWrapper onClick={onClose} />
      <ActionPopupItem onClick={() => onBlockTypeChange(AddBlockType.HIGHLIGHT_BLOCK)}>
        <HighlightBlockIcon />
        <AddBlockWrapper>
          <AddBlockTitle>{block.highlight.title}</AddBlockTitle>
          <AddBlockDesc>{block.highlight.desc}</AddBlockDesc>
        </AddBlockWrapper>
      </ActionPopupItem>
      <ActionPopupItem onClick={() => onBlockTypeChange(AddBlockType.TEXT_BLOCK)}>
        <TextBlockIcon />
        <AddBlockWrapper>
          <AddBlockTitle>{block.text.title}</AddBlockTitle>
          <AddBlockDesc>{block.text.desc}</AddBlockDesc>
        </AddBlockWrapper>
      </ActionPopupItem>
      <ActionPopupItem onClick={() => onBlockTypeChange(AddBlockType.LINK_BLOCK)}>
        <TextBlockIcon />
        <AddBlockWrapper>
          <AddBlockTitle>{link.addLinkForm.ModalHeading}</AddBlockTitle>
          <AddBlockDesc>{link.addLinkForm.description}</AddBlockDesc>
        </AddBlockWrapper>
      </ActionPopupItem>
    </ActionPopup>
  ) : (
    <></>
  );
};

export default Popup;
