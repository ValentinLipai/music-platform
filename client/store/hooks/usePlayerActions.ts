import { useAppDispatch } from '@/store';
import { bindActionCreators } from 'redux';
import { playerSlice } from '@/store/slices';

export const usePlayerActions = () => {
  const dispatch = useAppDispatch();

  return bindActionCreators(playerSlice.actions, dispatch);
};
