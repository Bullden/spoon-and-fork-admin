import {createAction} from 'redux-actions';
import types from './types';
import {DocumentsGroups, EvaluateDocumentsRevisionType} from 'entities/Documents';
import {ID} from 'entities/Common';
import Courier from 'entities/Courier';

export type UpdateRevision = {
  courierId: ID;
  type: EvaluateDocumentsRevisionType;
  comment: string;
};

export type FetchDetailsCompleted = {
  courier: Courier;
  groups: DocumentsGroups | undefined;
};

export default {
  fetchDetails: createAction<ID>(types.FETCH_DETAILS),
  fetchDetailsCompleted: createAction<FetchDetailsCompleted>(
    types.FETCH_DETAILS_COMPLETED,
  ),
  evaluateDocumentsRevision: createAction<UpdateRevision>(
    types.EVALUATE_DOCUMENTS_REVISION,
  ),
};
