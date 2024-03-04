import { GlobalsContext } from 'context/globalsContext';
import { useContext } from 'react';

export const useGlobals = () => {
  const globals = useContext(GlobalsContext);

  return globals;
};
