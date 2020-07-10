import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api/index';
import actions from './actions';
import {snackBarActions} from '../snackBar';
import {processError} from '../alert/saga';
import Laundry from 'entities/Laundry';

function* fetchLaundries() {
  try {
    const laundries: Laundry[] = yield SpoonAndForkApi.getLaundries();

    yield put(actions.fetchLaundriesCompleted(laundries));
  } catch (e) {
    yield put(actions.fetchLaundriesCompleted(e));
  }
}

function* fetchLaundriesCompleted({payload, error}: Action<Laundry[]>) {
  if (error) {
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
    takeEvery(types.FETCH_LAUNDRIES, fetchLaundries),
    takeEvery(types.FETCH_LAUNDRIES_COMPLETED, fetchLaundriesCompleted),
  ]);
}
