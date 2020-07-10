import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api/index';
import actions, {FetchDetailsCompleted, UpdateRestaurantInformation} from './actions';
import {actions as snackActions, snackBarActions} from '../snackBar';
import {processError} from '../alert/saga';
import Restaurant from 'entities/Restaurant';
import {ID} from 'entities/Common';
import {mapUpdateRestaurantInformationRequestToGQL} from 'api/Mappers';

function* fetchDetails({payload}: Action<ID>) {
  try {
    const restaurant: Restaurant = yield SpoonAndForkApi.getRestaurantById(payload);

    yield put(actions.fetchDetailsCompleted({restaurant}));
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

function* updateRestaurantInformation({
  payload: {request},
}: Action<UpdateRestaurantInformation>) {
  try {
    yield SpoonAndForkApi.updateRestaurantInformationRequest(
      mapUpdateRestaurantInformationRequestToGQL(request),
    );

    yield put(actions.updateRestaurantInformationRequestCompleted(request));
  } catch (e) {
    yield put(actions.updateRestaurantInformationRequestCompleted(e));
  }
}

function* updateRestaurantInformationCompleted({payload, error}: Action<Restaurant>) {
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
    takeEvery(types.UPDATE_RESTAURANT_INFORMATION, updateRestaurantInformation),
    takeEvery(
      types.UPDATE_RESTAURANT_INFORMATION_COMPLETED,
      updateRestaurantInformationCompleted,
    ),
  ]);
}
