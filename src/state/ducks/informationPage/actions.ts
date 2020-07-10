import {createAction} from 'redux-actions';
import types from './types';
import InformationPage from 'entities/InformationPage';
import {ID} from 'entities/Common';

export default {
  fetchDetails: createAction<ID>(types.FETCH_DETAILS),
  fetchInformationPages: createAction(types.FETCH_INFORMATION_PAGES),
  fetchInformationPagesCompleted: createAction<InformationPage[]>(
    types.FETCH_INFORMATION_PAGES_COMPLETED,
  ),
};
