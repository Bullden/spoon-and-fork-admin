import {DocumentsRevisionStatus} from 'entities/Documents';

type CourierType = 'firstCourier' | 'secondCourier';

type AcceptedByCourier = {
  action: 'acceptedByCourier';
  orderId: string;
  type: CourierType;
  courierId: string;
};

type CheckedIn = {
  action: 'checkedIn';
  orderId: string;
  type: CourierType | 'restaurant';
};

type CheckedOut = {
  action: 'checkedOut';
  orderId: string;
  type: CourierType | 'restaurant';
};

type WashingPaymentRequested = {
  action: 'washingPaymentRequested';
  orderId: string;
};

type NewOrderIsAvailable = {
  action: 'newOrderIsAvailable';
  orderId: string;
};

type WashPayed = {
  action: 'washPayed';
  orderId: string;
};

type OrderCompleted = {
  action: 'orderCompleted';
  orderId: string;
};

type DocumentsRevisionEvaluated = {
  action: 'documentsRevisionEvaluated';
  status: DocumentsRevisionStatus;
  comment: string;
};

type DocumentsVerificationRequested = {
  action: 'documentsVerificationRequested';
  courierId: string;
};

export type NotificationData =
  | AcceptedByCourier
  | CheckedIn
  | CheckedOut
  | WashingPaymentRequested
  | NewOrderIsAvailable
  | WashPayed
  | OrderCompleted
  | DocumentsRevisionEvaluated
  | DocumentsVerificationRequested;
