import {createAction} from 'redux-actions';
import types from './types';
import Set from 'entities/Set';

export default {
  fetchDetails: createAction<string>(types.FETCH_DETAILS),
  fetchSets: createAction(types.FETCH_SETS),
  fetchSetsCompleted: createAction<Set[]>(types.FETCH_SETS_COMPLETED),
};
