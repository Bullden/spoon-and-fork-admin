import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from './types';
import {
  empty,
  failed,
  LoadableContainer,
  success,
} from '../../entities/LoadableContainer';
import LaundriesContainer from 'state/entities/LaundriesContainer';
import Laundry from 'entities/Laundry';

type ReducerState = LoadableContainer<LaundriesContainer>;

const fetchLaundryCompleted: ReducerNextThrow<ReducerState, Laundry[]> = {
  next: (_, {payload}) => success({laundries: payload}),
  throw: (_, {payload}) => failed(payload),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_LAUNDRIES]: (state) => ({...state, isBusy: true}),
    [types.FETCH_LAUNDRIES_COMPLETED]: fetchLaundryCompleted,
  },
  empty(),
);
