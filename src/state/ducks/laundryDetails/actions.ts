import {createAction} from 'redux-actions';
import types from './types';
import {ID} from 'entities/Common';
import Laundry from 'entities/Laundry';
import UpdateLaundryInformationRequest from 'api/entities/UpdateLaundryInformationRequest';
import {NavigationPayload} from 'state/ducks/router/actions';

export type FetchDetailsCompleted = {
  laundry: Laundry;
};

export type UpdateLaundryInformation = {
  request: UpdateLaundryInformationRequest;
} & NavigationPayload;

export default {
  fetchDetails: createAction<ID>(types.FETCH_DETAILS),
  fetchDetailsCompleted: createAction<FetchDetailsCompleted>(
    types.FETCH_DETAILS_COMPLETED,
  ),
  updateLaundryInformationRequest: createAction<UpdateLaundryInformation>(
    types.UPDATE_LAUNDRY_INFORMATION,
  ),
  updateLaundryInformationRequestCompleted: createAction(
    types.UPDATE_LAUNDRY_INFORMATION_COMPLETED,
  ),
};
