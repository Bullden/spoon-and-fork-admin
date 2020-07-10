import {SessionContainer} from './Session';
import {LoadableContainer} from 'state/entities/LoadableContainer';
import {Auth} from 'state/entities/Auth';
import {SnackBar} from 'state/entities/SnackBar';
import OrdersContainer from 'state/entities/OrdersContainer';
import {OrderDetailsContainer} from 'state/entities/OrderDetailsContainer';
import ClientsContainer from 'state/entities/ClientsContainer';
import {ClientDetailsContainer} from 'state/entities/ClientDetailsContainer';
import CouriersContainer from 'state/entities/CouriersContainer';
import {CourierDetailsContainer} from 'state/entities/CourierDetailsContainer';
import LaundriesContainer from 'state/entities/LaundriesContainer';
import {LaundryDetailsContainer} from 'state/entities/LaundryDetailsContainer';
import InformationPagesContainer from 'state/entities/InformationPagesContainer';
import {InformationPageDetailsContainer} from 'state/entities/InformationPageDetailsContainer';

export default interface State {
  session: SessionContainer;
  auth: Auth;
  orders: LoadableContainer<OrdersContainer>;
  orderDetails: OrderDetailsContainer;
  clients: LoadableContainer<ClientsContainer>;
  clientDetails: ClientDetailsContainer;
  couriers: LoadableContainer<CouriersContainer>;
  courierDetails: CourierDetailsContainer;
  laundries: LoadableContainer<LaundriesContainer>;
  laundryDetails: LaundryDetailsContainer;
  informationPages: LoadableContainer<InformationPagesContainer>;
  informationPageDetails: InformationPageDetailsContainer;
  snackBar: SnackBar;
}
