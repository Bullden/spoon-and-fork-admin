import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api/index';
import actions, {
  UpdateCuisineCompleted,
  FetchDetailsCompleted,
  CreateCuisine,
  CreateCuisineCompleted,
} from './actions';
import {snackBarActions} from '../snackBar';
import {processError} from '../alert/saga';
import Cuisine from 'entities/Cuisine';
import {UpdateCuisine} from 'state/ducks/cuisineDetails/actions';
import {mapCreateCuisineRequestToGQL, mapUpdateCuisineRequestToGQL} from 'api/Mappers';
import cuisinesActions from 'state/ducks/cuisine/actions';

function* updateCuisine({payload: {request, history}}: Action<UpdateCuisine>) {
  try {
    if (request.uploadFile) {
      let uploadFileId: string;
      if (typeof request.uploadFile === 'string') {
        const urlParts = request.uploadFile.split('/');
        uploadFileId = urlParts[urlParts.length - 1];
      } else {
        uploadFileId = yield SpoonAndForkApi.uploadFile(request.uploadFile);
      }

      const cuisine: Cuisine = yield SpoonAndForkApi.updateCuisineRequest(
        mapUpdateCuisineRequestToGQL(request, uploadFileId),
      );
      yield put(actions.updateCuisineRequestCompleted({cuisine, history}));
      yield put(
        snackBarActions.showSnackbar({
          message: 'Cuisine success saved',
          type: 'success',
        }),
      );
    }
  } catch (e) {
    yield put(actions.updateCuisineRequestCompleted(e));
  }
}

function* updateCuisineCompleted({payload, error}: Action<UpdateCuisineCompleted>) {
  if (error) {
    yield put(
      snackBarActions.showSnackbar({
        message: processError({error: payload}),
        type: 'error',
      }),
    );
    return;
  }

  yield put(cuisinesActions.fetchCuisines());
}

function* createCuisine({payload: {request, history}}: Action<CreateCuisine>) {
  try {
    if (request.uploadFile && typeof request.uploadFile !== 'string') {
      const uploadFileId: string = yield SpoonAndForkApi.uploadFile(request.uploadFile);
      const cuisine: Cuisine = yield SpoonAndForkApi.createCuisineRequest(
        mapCreateCuisineRequestToGQL(request, uploadFileId),
      );
      yield put(actions.createCuisineRequestCompleted({cuisine, history}));
      yield put(
        snackBarActions.showSnackbar({
          message: 'Cuisine success saved',
          type: 'success',
        }),
      );
    }
  } catch (e) {
    yield put(actions.createCuisineRequestCompleted(e));
  }
}

function* createCuisineCompleted({payload, error}: Action<CreateCuisineCompleted>) {
  if (error) {
    yield put(
      snackBarActions.showSnackbar({
        message: processError({error: payload}),
        type: 'error',
      }),
    );
    return;
  }

  yield put(cuisinesActions.fetchCuisines());
}

function* fetchDetails({payload}: Action<string>) {
  try {
    const cuisine: Cuisine = yield SpoonAndForkApi.getCuisineById(payload);

    yield put(actions.fetchDetailsCompleted({cuisine}));
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
    takeEvery(types.UPDATE_CUISINE, updateCuisine),
    takeEvery(types.UPDATE_CUISINE_COMPLETED, updateCuisineCompleted),
    takeEvery(types.CREATE_CUISINE, createCuisine),
    takeEvery(types.CREATE_CUISINE_COMPLETED, createCuisineCompleted),
  ]);
}
