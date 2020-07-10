import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api/index';
import actions, {FetchDetailsCompleted, UpdateLaundryInformation} from './actions';
import {actions as snackActions, snackBarActions} from '../snackBar';
import {processError} from '../alert/saga';
import Laundry from 'entities/Laundry';
import {ID} from 'entities/Common';
import {mapUpdateLaundryInformationRequestToGQL} from 'api/Mappers';

function* fetchDetails({payload}: Action<ID>) {
  try {
    const laundry: Laundry = yield SpoonAndForkApi.getLaundryById(payload);

    yield put(actions.fetchDetailsCompleted({laundry}));
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

function* updateLaundryInformation({
  payload: {request},
}: Action<UpdateLaundryInformation>) {
  try {
    yield SpoonAndForkApi.updateLaundryInformationRequest(
      mapUpdateLaundryInformationRequestToGQL(request),
    );

    yield put(actions.updateLaundryInformationRequestCompleted(request));
  } catch (e) {
    yield put(actions.updateLaundryInformationRequestCompleted(e));
  }
}

function* updateLaundryInformationCompleted({payload, error}: Action<Laundry>) {
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
    takeEvery(types.UPDATE_LAUNDRY_INFORMATION, updateLaundryInformation),
    takeEvery(
      types.UPDATE_LAUNDRY_INFORMATION_COMPLETED,
      updateLaundryInformationCompleted,
    ),
  ]);
}
