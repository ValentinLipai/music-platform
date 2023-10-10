import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppState } from '@/store';

export const useTypedAppSelector: TypedUseSelectorHook<AppState> = useSelector;
