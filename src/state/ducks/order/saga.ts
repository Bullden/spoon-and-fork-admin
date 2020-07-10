import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api/index';
import actions from './actions';
import {snackBarActions} from '../snackBar';
import {processError} from '../alert/saga';
import Order from 'entities/Order';

function* fetchOrders() {
  try {
    const orders: Order[] = yield SpoonAndForkApi.getOrders();

    yield put(actions.fetchOrdersCompleted(orders));
  } catch (e) {
    yield put(actions.fetchOrdersCompleted(e));
  }
}

function* fetchOrdersCompleted({payload, error}: Action<Order[]>) {
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
    takeEvery(types.FETCH_ORDERS, fetchOrders),
    takeEvery(types.FETCH_ORDERS_COMPLETED, fetchOrdersCompleted),
  ]);
}
