import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api/index';
import actions, {
  CreateOrUpdateInformationPageCompleted,
  FetchDetailsCompleted,
} from './actions';
import {snackBarActions} from '../snackBar';
import {processError} from '../alert/saga';
import InformationPage from 'entities/InformationPage';
import {CreateOrUpdateInformationPage} from 'state/ducks/informationPageDetails/actions';
import {mapCreateOrUpdateInformationPageRequestToGQL} from 'api/Mappers';
import informationPagesActions from 'state/ducks/informationPage/actions';

function* createOrUpdateInformationPage({
  payload: {request, history},
}: Action<CreateOrUpdateInformationPage>) {
  try {
    const informationPage: InformationPage = yield SpoonAndForkApi.createOrUpdateInformationPageRequest(
      mapCreateOrUpdateInformationPageRequestToGQL(request),
    );
    yield put(
      actions.createOrUpdateInformationPageRequestCompleted({informationPage, history}),
    );
    yield put(
      snackBarActions.showSnackbar({
        message: 'Information page success saved',
        type: 'success',
      }),
    );
  } catch (e) {
    yield put(actions.createOrUpdateInformationPageRequestCompleted(e));
  }
}

function* createOrUpdateInformationPageCompleted({
  payload,
  error,
}: Action<CreateOrUpdateInformationPageCompleted>) {
  if (error) {
    yield put(
      snackBarActions.showSnackbar({
        message: processError({error: payload}),
        type: 'error',
      }),
    );
    return;
  }

  yield put(informationPagesActions.fetchInformationPages());
}

function* fetchDetails({payload}: Action<string>) {
  try {
    const informationPage: InformationPage = yield SpoonAndForkApi.getInformationPageById(
      payload,
    );

    yield put(actions.fetchDetailsCompleted({informationPage}));
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

export default function* () {
  yield all([
    //
    takeEvery(types.FETCH_DETAILS, fetchDetails),
    takeEvery(types.FETCH_DETAILS_COMPLETED, fetchDetailsCompleted),
    takeEvery(types.CREATE_OR_UPDATE_INFORMATION_PAGE, createOrUpdateInformationPage),
    takeEvery(
      types.CREATE_OR_UPDATE_INFORMATION_PAGE_COMPLETED,
      createOrUpdateInformationPageCompleted,
    ),
  ]);
}
