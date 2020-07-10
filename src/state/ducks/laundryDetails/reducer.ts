import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from './types';
import {empty, failed, success} from '../../entities/LoadableContainer';
import {LaundryDetailsContainer} from 'state/entities/LaundryDetailsContainer';
import {FetchDetailsCompleted} from 'state/ducks/laundryDetails/actions';

type ReducerState = LaundryDetailsContainer;

const fetchDetailsCompleted: ReducerNextThrow<ReducerState, FetchDetailsCompleted> = {
  next: (state, {payload}) => ({
    ...state,
    laundry: success(payload.laundry),
  }),
  throw: (state, {payload}) => ({...state, laundry: failed(payload)}),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_DETAILS_COMPLETED]: fetchDetailsCompleted,
    [types.SUBMIT]: (state) => ({...state, isVerifying: true}),
  },
  {laundry: empty()},
);
