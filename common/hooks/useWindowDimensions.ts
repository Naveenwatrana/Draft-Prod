import { useState, useEffect } from 'react';
import { UseWindowDimensionsReturn, WindowDimensions, WindowSize } from 'common/hooks/types';
import { mobileWidthLimit, tabletWidthLimit } from 'common/constants';

function getWindowDimensions() {
  if (typeof window !== 'undefined') {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  return { width: 0, height: 0 };
}
function getWindowSize(dimensions: WindowDimensions) {
  if (dimensions.width <= mobileWidthLimit) {
    return 'mobile';
  }
  if (dimensions.width <= tabletWidthLimit) {
    return 'tablet';
  }
  return 'desktop';
}

export const useWindowDimensions = (): UseWindowDimensionsReturn => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [windowDimensions, setWindowDimensions] = useState(dimensions);
  const [windowSize, setWindowSize] = useState<WindowSize>(getWindowSize(dimensions));
  const [isDesktopView, setIsDesktopView] = useState(windowSize === 'desktop');

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    function handleResize() {
      window.requestAnimationFrame(() => {
        const currentDimensions = getWindowDimensions();
        setWindowDimensions(currentDimensions);
        const windowSizeUpdated = getWindowSize(currentDimensions);
        setWindowSize(windowSizeUpdated);
        setIsDesktopView(windowSizeUpdated === 'desktop');
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    windowDimensions,
    windowSize,
    isDesktopView,
  };
};
