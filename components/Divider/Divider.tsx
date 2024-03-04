import React from 'react';
import { DividerComp } from './styles';

type DividerProps = {
  className?: string;
};

export const Divider = ({ className }: DividerProps) => <DividerComp data-testid="divider" className={className} />;

export default Divider;
