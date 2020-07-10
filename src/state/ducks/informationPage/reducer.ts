import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from './types';
import {
  empty,
  failed,
  LoadableContainer,
  success,
} from '../../entities/LoadableContainer';
import InformationPagesContainer from 'state/entities/InformationPagesContainer';
import InformationPage from 'entities/InformationPage';

type ReducerState = LoadableContainer<InformationPagesContainer>;

const fetchInformationPageCompleted: ReducerNextThrow<ReducerState, InformationPage[]> = {
  next: (_, {payload}) => success({informationPages: payload}),
  throw: (_, {payload}) => failed(payload),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_INFORMATION_PAGES]: (state) => ({...state, isBusy: true}),
    [types.FETCH_INFORMATION_PAGES_COMPLETED]: fetchInformationPageCompleted,
    [types.CLEAR]: () => empty(),
  },
  empty(),
);
