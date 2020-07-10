import {createAction} from 'redux-actions';
import types from './types';
import {ID} from 'entities/Common';
import Restaurant from 'entities/Restaurant';
import UpdateRestaurantInformationRequest from 'api/entities/UpdateRestaurantInformationRequest';
import {NavigationPayload} from 'state/ducks/router/actions';

export type FetchDetailsCompleted = {
  restaurant: Restaurant;
};

export type UpdateRestaurantInformation = {
  request: UpdateRestaurantInformationRequest;
} & NavigationPayload;

export default {
  fetchDetails: createAction<ID>(types.FETCH_DETAILS),
  fetchDetailsCompleted: createAction<FetchDetailsCompleted>(
    types.FETCH_DETAILS_COMPLETED,
  ),
  updateRestaurantInformationRequest: createAction<UpdateRestaurantInformation>(
    types.UPDATE_RESTAURANT_INFORMATION,
  ),
  updateRestaurantInformationRequestCompleted: createAction(
    types.UPDATE_RESTAURANT_INFORMATION_COMPLETED,
  ),
};
