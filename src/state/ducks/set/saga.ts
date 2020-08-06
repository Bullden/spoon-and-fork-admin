import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api/index';
import actions from './actions';
import {snackBarActions} from '../snackBar';
import {processError} from '../alert/saga';
import Set from 'entities/Set';
import {ID} from 'entities/Common';

function* fetchSets() {
  try {
    const sets: Set[] = yield SpoonAndForkApi.getSets();

    yield put(actions.fetchSetsCompleted(sets));
  } catch (e) {
    yield put(actions.fetchSetsCompleted(e));
  }
}

function* fetchSetsCompleted({payload, error}: Action<Set[]>) {
  if (error) {
    yield put(
      snackBarActions.showSnackbar({
        message: processError({error: payload}),
        type: 'error',
      }),
    );
  }
}

function* fetchSetsByDishId({payload}: Action<ID>) {
  try {
    const setsByDishId: Set[] = yield SpoonAndForkApi.getSetsByDishId(payload);

    yield put(actions.fetchSetsCompleted(setsByDishId));
  } catch (e) {
    yield put(actions.fetchSetsCompleted(e));
  }
}

export default function* () {
  yield all([
    //
    takeEvery(types.FETCH_SETS, fetchSets),
    takeEvery(types.FETCH_SETS_COMPLETED, fetchSetsCompleted),
    takeEvery(types.FETCH_SETS_BY_DISH_ID, fetchSetsByDishId),
  ]);
}
