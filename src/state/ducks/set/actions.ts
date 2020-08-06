import {createAction} from 'redux-actions';
import types from './types';
import Set from 'entities/Set';
import {ID} from 'entities/Common';

export default {
  fetchDetails: createAction<string>(types.FETCH_DETAILS),
  fetchSets: createAction(types.FETCH_SETS),
  fetchSetsCompleted: createAction<Set[]>(types.FETCH_SETS_COMPLETED),
  fetchSetsByDishId: createAction<ID>(types.FETCH_SETS_BY_DISH_ID),
  fetchSetsByDishIdCompleted: createAction<Set[]>(types.FETCH_SETS_BY_DISH_ID_COMPLETED),
};
