import {createAction} from 'redux-actions';
import types from './types';
import {ID} from 'entities/Common';
import Courier from 'entities/Courier';
import UpdateCourierInformationRequest from 'api/entities/UpdateUserInformationRequest';
import {NavigationPayload} from 'state/ducks/router/actions';

export type FetchDetailsCompleted = {
  courier: Courier;
};

export type UpdateCourierInformation = {
  request: UpdateCourierInformationRequest;
} & NavigationPayload;

export default {
  fetchDetails: createAction<ID>(types.FETCH_DETAILS),
  fetchDetailsCompleted: createAction<FetchDetailsCompleted>(
    types.FETCH_DETAILS_COMPLETED,
  ),
  updateCourierInformationRequest: createAction<UpdateCourierInformation>(
    types.UPDATE_COURIER_INFORMATION,
  ),
  updateCourierInformationRequestCompleted: createAction(
    types.UPDATE_COURIER_INFORMATION_COMPLETED,
  ),
};
