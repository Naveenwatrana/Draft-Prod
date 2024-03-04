import { useEffect } from 'react';

const useOutsideAlerter = ({
  ref,
  outSideClick,
}: {
  ref: React.RefObject<HTMLDivElement>;
  outSideClick: () => void;
}) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        outSideClick();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, outSideClick]);
};
export default useOutsideAlerter;
