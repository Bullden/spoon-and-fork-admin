import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api/index';
import actions, {FetchDetailsCompleted, UpdateRevision} from './actions';
import {snackBarActions} from '../snackBar';
import {processError} from '../alert/saga';
import Courier from 'entities/Courier';
import {DocumentsGroups, EvaluateDocumentsRevisionType} from 'entities/Documents';
import {ID} from 'entities/Common';

function* fetchDetails({payload}: Action<ID>) {
  try {
    const courier: Courier = yield SpoonAndForkApi.getCourierById(payload);

    let groups: DocumentsGroups | undefined;
    if (courier.revision)
      groups = yield SpoonAndForkApi.getDocuments(courier.revision.id);
    yield put(actions.fetchDetailsCompleted({courier, groups}));
  } catch (e) {
    yield put(actions.fetchDetailsCompleted(e));
  }
}

function* fetchDetailsCompleted({payload, error}: Action<FetchDetailsCompleted>) {
  if (error) {
    yield put(
      snackBarActions.showSnackbar({
        message: processError({error: payload}),
        type: 'error',
      }),
    );
  }
}

function* evaluateDocumentsRevision({payload}: Action<UpdateRevision>) {
  try {
    yield SpoonAndForkApi.evaluateDocumentsRevision(
      payload.courierId,
      payload.type,
      payload.comment,
    );
    const message = (() => {
      switch (payload.type) {
        case EvaluateDocumentsRevisionType.RequestChanges:
          return 'Changes requested';
        case EvaluateDocumentsRevisionType.Approve:
          return 'Revision approved';
        case EvaluateDocumentsRevisionType.Reject:
          return 'Revision rejected';
      }
    })();
    yield put(
      snackBarActions.showSnackbar({
        message,
        type: 'info',
      }),
    );
    yield put(actions.fetchDetails(payload.courierId));
  } catch (e) {
    yield put(
      snackBarActions.showSnackbar({
        message: processError({error: payload}),
        type: 'error',
      }),
    );
  }
}

export default function* () {
  yield all([
    //
    takeEvery(types.FETCH_DETAILS, fetchDetails),
    takeEvery(types.FETCH_DETAILS_COMPLETED, fetchDetailsCompleted),
    takeEvery(types.EVALUATE_DOCUMENTS_REVISION, evaluateDocumentsRevision),
  ]);
}
