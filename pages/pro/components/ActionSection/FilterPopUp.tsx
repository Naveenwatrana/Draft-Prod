import useOutsideAlerter from 'common/hooks/useOutsideAlerter';
import { useRef } from 'react';
import TextComp from 'components/textComp';
import lang from 'common/lang';
import ModalElement from 'components/Modal/Modal';
import { CrossIconWrapper, StyledFilterPop, StyledFilterPopContainer } from './style';
import { FilterPopupProps } from './types';

const {
  profile: { filter },
} = lang;

const FilterPopUp = ({ onClose, open, filtersToRender }: FilterPopupProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter({
    ref: wrapperRef,
    outSideClick: onClose,
  });
  if (!open) {
    return null;
  }
  return (
    <ModalElement isOpen={open} centered position={2} shouldCloseOnOverlayClick>
      <StyledFilterPopContainer>
        <StyledFilterPop ref={wrapperRef} style={{ position: 'absolute', top: '50%' }}>
          <TextComp component="h3">{filter}</TextComp>
          <CrossIconWrapper onClick={onClose} />
          {filtersToRender}
        </StyledFilterPop>
      </StyledFilterPopContainer>
    </ModalElement>
  );
};

export default FilterPopUp;
