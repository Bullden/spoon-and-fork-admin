import Laundry from 'entities/Laundry';
import {Bag} from 'entities/Bag';
import User from 'entities/User';
import OrderInfo from './OrderInfo';
import {WashingInfo} from './WashingInfo';

export default interface Order {
  id: string;
  laundry: Laundry;
  client: User;
  bags: Bag[];
  orderInfo: OrderInfo;
  comment: string;
  number: number;
  created: Date;
  placement: OrderPlacement;
  state: OrderState;
  washingInfo: WashingInfo | undefined;
  firstCourierId: string;
  secondCourierId: string;
  preferredService: string;
}

export enum OrderState {
  WaitingForPayment = 'WaitingForPayment',
  ReadyForDelivery = 'ReadyForDelivery',
  AcceptedByCourier = 'AcceptedByCourier',
  AcceptedByLaundry = 'AcceptedByLaundry',
  Delivering = 'Delivering',
  Delivered = 'Delivered',
  Washing = 'Washing',
  Completed = 'Completed',
}
export enum OrderPlacement {
  Client,
  Laundry,
}
