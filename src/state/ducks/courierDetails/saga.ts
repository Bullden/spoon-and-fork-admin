import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api/index';
import actions, {FetchDetailsCompleted, UpdateCourierInformation} from './actions';
import {actions as snackActions, snackBarActions} from '../snackBar';
import {processError} from '../alert/saga';
import Courier from 'entities/Courier';
import {ID} from 'entities/Common';
import {mapUpdateCourierInformationRequestToGQL} from 'api/Mappers';

function* fetchDetails({payload}: Action<ID>) {
  try {
    const courier: Courier = yield SpoonAndForkApi.getCourierById(payload);

    yield put(actions.fetchDetailsCompleted({courier}));
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

function* updateCourierInformation({
  payload: {request},
}: Action<UpdateCourierInformation>) {
  try {
    yield SpoonAndForkApi.updateCourierInformationRequest(
      mapUpdateCourierInformationRequestToGQL(request),
    );

    yield put(actions.updateCourierInformationRequestCompleted(request));
  } catch (e) {
    yield put(actions.updateCourierInformationRequestCompleted(e));
  }
}

function* updateCourierInformationCompleted({payload, error}: Action<Courier>) {
  if (error) {
    yield put(
      snackActions.showSnackbar({message: processError({error: payload}), type: 'error'}),
    );
    return;
  }

  yield put(actions.fetchDetails(payload.id));
}

export default function* () {
  yield all([
    //
    takeEvery(types.FETCH_DETAILS, fetchDetails),
    takeEvery(types.FETCH_DETAILS_COMPLETED, fetchDetailsCompleted),
    takeEvery(types.UPDATE_COURIER_INFORMATION, updateCourierInformation),
    takeEvery(
      types.UPDATE_COURIER_INFORMATION_COMPLETED,
      updateCourierInformationCompleted,
    ),
  ]);
}
