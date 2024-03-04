import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState } from 'common/store/types';
import type { AppDispatch } from 'common/store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
