import {createAction} from 'redux-actions';
import types from './types';
import InformationPage from 'entities/InformationPage';
import {NavigationPayload} from 'state/ducks/router/actions';
import CreateOrUpdateInformationPageRequest from 'api/entities/CreateOrUpdateInformationPageRequest';

export type FetchDetailsCompleted = {
  informationPage: InformationPage;
};

export type CreateOrUpdateInformationPage = {
  request: CreateOrUpdateInformationPageRequest;
} & NavigationPayload;
export type CreateOrUpdateInformationPageCompleted = {
  informationPage: InformationPage;
} & NavigationPayload;

export default {
  fetchDetails: createAction<String>(types.FETCH_DETAILS),
  fetchDetailsCompleted: createAction<FetchDetailsCompleted>(
    types.FETCH_DETAILS_COMPLETED,
  ),
  createOrUpdateInformationPageRequest: createAction<CreateOrUpdateInformationPage>(
    types.CREATE_OR_UPDATE_INFORMATION_PAGE,
  ),
  createOrUpdateInformationPageRequestCompleted: createAction<
    CreateOrUpdateInformationPageCompleted
  >(types.CREATE_OR_UPDATE_INFORMATION_PAGE_COMPLETED),
};
