import {reducer as sessionReducer, saga as sessionSaga} from './session';
import {saga as authSaga} from './auth';
import authReducer from './auth/reducer';
import {saga as routerSaga} from './router';
import {saga as alertSaga} from './alert';
import {reducer as snackBarReducer} from 'state/ducks/snackBar';
import {saga as imagePickerSaga} from 'state/ducks/imagePicker';
import {reducer as ordersReducer, saga as ordersSaga} from 'state/ducks/order';
import {reducer as clientsReducer, saga as clientsSaga} from 'state/ducks/client';
import {reducer as couriersReducer, saga as couriersSaga} from 'state/ducks/courier';
import {reducer as laundriesReducer, saga as laundriesSaga} from 'state/ducks/laundry';
import {
  reducer as informationPagesReducer,
  saga as informationPagesSaga,
} from 'state/ducks/informationPage';
import {
  reducer as orderDetailsReducer,
  saga as orderDetailsSaga,
} from 'state/ducks/orderDetails';
import {
  reducer as clientDetailsReducer,
  saga as clientDetailsSaga,
} from 'state/ducks/clientDetails';
import {
  reducer as courierDetailsReducer,
  saga as courierDetailsSaga,
} from 'state/ducks/courierDetails';
import {
  reducer as laundryDetailsReducer,
  saga as laundryDetailsSaga,
} from 'state/ducks/laundryDetails';
import {
  reducer as informationPageDetailsReducer,
  saga as informationPageDetailsSaga,
} from 'state/ducks/informationPageDetails';
import {all} from 'redux-saga/effects';
import State from 'state/entities/State';
import {combineReducers} from 'redux';
import {saga as pushNotificationSaga} from './pushNotification';

export const rootReducer = combineReducers<State>({
  session: sessionReducer,
  auth: authReducer,
  snackBar: snackBarReducer,
  orders: ordersReducer,
  orderDetails: orderDetailsReducer,
  clients: clientsReducer,
  clientDetails: clientDetailsReducer,
  couriers: couriersReducer,
  courierDetails: courierDetailsReducer,
  laundries: laundriesReducer,
  laundryDetails: laundryDetailsReducer,
  informationPages: informationPagesReducer,
  informationPageDetails: informationPageDetailsReducer,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    routerSaga(),
    sessionSaga(),
    alertSaga(),
    imagePickerSaga(),
    clientsSaga(),
    clientDetailsSaga(),
    ordersSaga(),
    orderDetailsSaga(),
    couriersSaga(),
    courierDetailsSaga(),
    laundriesSaga(),
    laundryDetailsSaga(),
    informationPagesSaga(),
    informationPageDetailsSaga(),
    pushNotificationSaga(),
  ]);
}
