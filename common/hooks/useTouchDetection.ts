import { useState, useEffect } from 'react';
import { UseTouchDetectionReturn } from './types';

export const useTouchDetection = (): UseTouchDetectionReturn => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true)
    }
  }, []);

  return isTouchDevice;
};