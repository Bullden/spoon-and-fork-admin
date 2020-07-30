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
import RestaurantsContainer from 'state/entities/RestaurantsContainer';
import {RestaurantDetailsContainer} from 'state/entities/RestaurantDetailsContainer';
import CuisinesContainer from 'state/entities/CuisinesContainer';
import {CuisineDetailsContainer} from 'state/entities/CuisineDetailsContainer';
import DishesContainer from 'state/entities/DishesContainer';
import {DishDetailsContainer} from 'state/entities/DishDetailsContainer';

export default interface State {
  session: SessionContainer;
  auth: Auth;
  orders: LoadableContainer<OrdersContainer>;
  orderDetails: OrderDetailsContainer;
  clients: LoadableContainer<ClientsContainer>;
  clientDetails: ClientDetailsContainer;
  couriers: LoadableContainer<CouriersContainer>;
  courierDetails: CourierDetailsContainer;
  restaurants: LoadableContainer<RestaurantsContainer>;
  restaurantDetails: RestaurantDetailsContainer;
  cuisines: LoadableContainer<CuisinesContainer>;
  cuisineDetails: CuisineDetailsContainer;
  dishes: LoadableContainer<DishesContainer>;
  dishDetails: DishDetailsContainer;
  snackBar: SnackBar;
}
