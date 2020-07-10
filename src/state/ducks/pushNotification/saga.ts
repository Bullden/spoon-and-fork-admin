import {all, takeEvery, put, select} from 'redux-saga/effects';
import types from './types';
import {SpoonAndForkApi} from 'api/index';
import {FirebaseMessagingService} from 'services';
import {Action} from 'redux-actions';
import {MessageReceived} from 'state/ducks/pushNotification/actions';
import {NotificationData} from 'state/ducks/pushNotification/model';
import {courierActions} from 'state/ducks/courier';
import {CourierDetailsContainer} from 'state/entities/CourierDetailsContainer';
import State from 'state/entities/State';
import {courierDetailsActions} from 'state/ducks/courierDetails';
import {alertActions} from 'state/ducks/alert';

function* updateToken() {
  try {
    const token = yield FirebaseMessagingService.getToken();
    yield SpoonAndForkApi.updateFirebaseToken({registrationId: token});
  } catch (e) {
    yield put(alertActions.showError(e));
  }
}

function* messageReceived({payload: {data}}: Action<MessageReceived>) {
  if (!data) return;

  const message: NotificationData = data;

  if (message.action === 'documentsVerificationRequested') {
    const courierDetails: CourierDetailsContainer = yield select(
      (state: State) => state.courierDetails,
    );

    yield put(courierActions.fetchCouriers());
    if (
      courierDetails.courier.isSuccess &&
      courierDetails.courier.id === message.courierId
    ) {
      yield put(courierDetailsActions.fetchDetails(courierDetails.courier.id));
    }
  }
}

export default function* () {
  yield all([
    //
    takeEvery(types.UPDATE_TOKEN, updateToken),
    takeEvery(types.MESSAGE_RECEIVED, messageReceived),
  ]);
}
