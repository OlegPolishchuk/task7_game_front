import { useDispatch } from 'react-redux';

import { AppDispatch } from 'store/store';

export const useAppDispatch = (): ReturnType<typeof useDispatch<AppDispatch>> =>
  useDispatch<AppDispatch>();
