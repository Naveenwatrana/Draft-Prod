import { useMemo, useState } from 'react';

const useHoverFocus = () => {
  const [focused, setFocused] = useState<boolean>();
  const manageFocus = useMemo(() => {
    return {
      onMouseEnter: () => setFocused(false),
      onMouseLeave: () => setFocused(true),
    };
  }, []);
  return { focused, manageFocus };
};

export default useHoverFocus;
