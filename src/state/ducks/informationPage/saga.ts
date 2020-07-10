import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api/index';
import actions from './actions';
import {snackBarActions} from '../snackBar';
import {processError} from '../alert/saga';
import InformationPage from 'entities/InformationPage';

function* fetchInformationPages() {
  try {
    const informationPages: InformationPage[] = yield SpoonAndForkApi.getInformationPages();

    yield put(actions.fetchInformationPagesCompleted(informationPages));
  } catch (e) {
    yield put(actions.fetchInformationPagesCompleted(e));
  }
}

function* fetchInformationPagesCompleted({payload, error}: Action<InformationPage[]>) {
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
    takeEvery(types.FETCH_INFORMATION_PAGES, fetchInformationPages),
    takeEvery(types.FETCH_INFORMATION_PAGES_COMPLETED, fetchInformationPagesCompleted),
  ]);
}
