import {createAction} from 'redux-actions';
import types from './types';
import Cuisine from 'entities/Cuisine';
import {NavigationPayload} from 'state/ducks/router/actions';
import UpdateCuisineRequest from 'state/entities/UpdateCuisineRequest';

export type FetchDetailsCompleted = {
  cuisine: Cuisine;
};

export type UpdateCuisine = {
  request: UpdateCuisineRequest;
} & NavigationPayload;
export type UpdateCuisineCompleted = {
  cuisine: Cuisine;
} & NavigationPayload;

export default {
  fetchDetails: createAction<string>(types.FETCH_DETAILS),
  fetchDetailsCompleted: createAction<FetchDetailsCompleted>(
    types.FETCH_DETAILS_COMPLETED,
  ),
  updateCuisineRequest: createAction<UpdateCuisine>(types.UPDATE_CUISINE),
  updateCuisineRequestCompleted: createAction<UpdateCuisineCompleted>(
    types.UPDATE_CUISINE_COMPLETED,
  ),
};
