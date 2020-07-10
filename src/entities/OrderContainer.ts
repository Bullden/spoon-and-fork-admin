import {LoadableContainer} from 'state/entities/LoadableContainer';
import Order from 'entities/Order';

export interface Orders {
  items: Order[];
}

export interface OrderContainer {
  laundryOrders: LoadableContainer<Orders>;
  clientOrders: LoadableContainer<Orders>;
}
