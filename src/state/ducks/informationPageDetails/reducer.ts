import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from './types';
import {empty, failed, success} from '../../entities/LoadableContainer';
import {InformationPageDetailsContainer} from 'state/entities/InformationPageDetailsContainer';
import {FetchDetailsCompleted} from 'state/ducks/informationPageDetails/actions';

type ReducerState = InformationPageDetailsContainer;

const fetchDetailsCompleted: ReducerNextThrow<ReducerState, FetchDetailsCompleted> = {
  next: (state, {payload}) => ({
    ...state,
    informationPage: success(payload.informationPage),
  }),
  throw: (state, {payload}) => ({...state, informationPage: failed(payload)}),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_DETAILS_COMPLETED]: fetchDetailsCompleted,
    [types.SUBMIT]: (state) => ({...state}),
  },
  {informationPage: empty()},
);
