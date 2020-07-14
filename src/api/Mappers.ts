import RegisterRequest from 'auth/RegisterRequest';
import ApiRegisterRequest from 'api/entities/RegisterRequest';
import LoginRequest from '@spryrocks/react-auth/LoginRequest';
import ApiLoginRequest from 'api/entities/LoginRequest';
import {Account} from 'entities/Account';
import User from 'entities/User';
import AdditionalUserInfo from 'entities/AdditionalUserInfo';
import ApiConfiguration from '@spryrocks/react-api/ApiConfiguration';
import {
  Account as GQLAccount,
  Address as GQLAddress,
  Cart as GQLCart,
  Set as GQLSet,
  Dish as GQLDish,
  Ingredient as GQLIngredient,
  Status as GQLStatus,
  OrderState as GQLOrderState,
  Bag as GQLBag,
  User as GQLUser,
  Order as GQLOrder,
  OrderInfo as GQLOrderInfo,
  Client as GQLClient,
  Courier as GQLCourier,
  Restaurant as GQLRestaurant,
  InformationPage as GQLInformationPage,
} from './graphql/types';
import Client from 'entities/Client';
import Courier from 'entities/Courier';
import Restaurant from 'entities/Restaurant';
import InformationPage from 'entities/InformationPage';
import Set from 'entities/Set';
import Dish from 'entities/Dish';
import Ingredient from 'entities/Ingredient';
import Status from 'entities/Status';
import Order, {OrderState} from 'entities/Order';
import {Bag} from 'entities/Bag';
import Address from 'entities/Address';
import Cart from 'entities/Cart';
import OrderInfo from '../entities/OrderInfo';
import CreateOrUpdateInformationPageRequest from 'api/entities/CreateOrUpdateInformationPageRequest';
import UpdateUserInformationRequest from 'api/entities/UpdateUserInformationRequest';
import UpdateRestaurantInformationRequest from './entities/UpdateRestaurantInformationRequest';

export const mapRegisterRequestToApi = (
  registerRequest: RegisterRequest,
): ApiRegisterRequest => ({
  name: registerRequest.name,
  email: registerRequest.email,
  phoneNumber: registerRequest.phoneNumber,
  password: registerRequest.password,
});

export const mapCreateOrUpdateInformationPageRequestToGQL = (
  createOrUpdateInformationPageRequest: CreateOrUpdateInformationPageRequest,
): CreateOrUpdateInformationPageRequest => ({
  key: createOrUpdateInformationPageRequest.key,
  title: createOrUpdateInformationPageRequest.title,
  body: createOrUpdateInformationPageRequest.body,
});

export const mapUpdateClientInformationRequestToGQL = (
  updateClientInformationRequest: UpdateUserInformationRequest,
): UpdateUserInformationRequest => ({
  id: updateClientInformationRequest.id,
  name: updateClientInformationRequest.name,
  email: updateClientInformationRequest.email,
  phoneNumber: updateClientInformationRequest.phoneNumber,
});

export const mapUpdateCourierInformationRequestToGQL = (
  updateCourierInformationRequest: UpdateUserInformationRequest,
): UpdateUserInformationRequest => ({
  id: updateCourierInformationRequest.id,
  name: updateCourierInformationRequest.name,
  email: updateCourierInformationRequest.email,
  phoneNumber: updateCourierInformationRequest.phoneNumber,
});

export const mapLoginRequestToApi = (loginRequest: LoginRequest): ApiLoginRequest => ({
  email: loginRequest.email,
  password: loginRequest.password,
});

export const mapAdditionalUserInfoFromGQL = (
  additionalInfo: AdditionalUserInfo,
): AdditionalUserInfo => ({
  email: additionalInfo.email,
  phoneNumber: additionalInfo.phoneNumber,
});

export const mapImageFromGQL = (
  configuration: ApiConfiguration,
  imageId: string,
): string => {
  return `${configuration.rest.path}/files/${imageId}`;
};

export const mapUserFromGQL = (user: GQLUser): User => ({
  id: user.id,
  name: user.name,
  additionalInfo: user.additionalUserInfo
    ? mapAdditionalUserInfoFromGQL(user.additionalUserInfo)
    : undefined,
});

export const mapMyAccountFromGQL = (account: GQLAccount): Account => ({
  info: mapAdditionalUserInfoFromGQL(account.info),
  user: mapUserFromGQL(account.user),
});

export const mapAddressFromGQL = (location: GQLAddress): Address => ({
  id: location.id,
  palaceId: location.placeId || undefined,
  description: location.description,
  latLng: location.latLng,
});

export const mapOrderInfoFromGQL = (orderInfo: GQLOrderInfo): OrderInfo => ({
  id: orderInfo.id,
  priceCents: orderInfo.priceCents,
  distanceMiles: orderInfo.distanceMiles,
  clientAddress: mapAddressFromGQL(orderInfo.clientAddress),
});

export const mapClientFromGQL = (
  configuration: ApiConfiguration,
  client: GQLClient,
): Client => ({
  id: client.id,
  user: mapUserFromGQL(client.user),
});

export const mapCourierFromGQL = (courier: GQLCourier): Courier => ({
  id: courier.id,
  user: mapUserFromGQL(courier.user),
});

export const mapRestaurantFromGQL = (restaurant: GQLRestaurant): Restaurant => ({
  id: restaurant.id,
  userId: restaurant.userId,
  imageId: restaurant.imageId,
  description: restaurant.description,
  address: mapAddressFromGQL(restaurant.address),
});

export const mapUpdateRestaurantInformationRequestToGQL = (
  updateRestaurantInformationRequest: UpdateRestaurantInformationRequest,
): UpdateRestaurantInformationRequest => ({
  id: updateRestaurantInformationRequest.id,
  addressDescription: updateRestaurantInformationRequest.addressDescription,
  lat: updateRestaurantInformationRequest.lat,
  lng: updateRestaurantInformationRequest.lng,
  description: updateRestaurantInformationRequest.description,
});

export const mapInformationPageFromGQL = (
  configuration: ApiConfiguration,
  informationPage: GQLInformationPage,
): InformationPage => ({
  id: informationPage.id,
  key: informationPage.key,
  title: informationPage.title,
  body: informationPage.body,
});

export const mapBagFromGQL = (bag: GQLBag): Bag => ({
  id: bag.id,
  code: bag.code,
});

export const mapBagsFromGQL = (bags: GQLBag[]): Bag[] =>
  bags.map((bag) => mapBagFromGQL(bag));

export const mapCartFromGQL = (cart: GQLCart): Cart => ({
  id: cart.id,
  userId: cart.userId,
});

export const mapIngredientFromGQL = (ingredient: GQLIngredient): Ingredient => ({
  id: ingredient.id,
  name: ingredient.name,
});

export const mapIngredientsFromGQL = (ingredients: GQLIngredient[]): Ingredient[] => {
  return ingredients.map((ingredient) => mapIngredientFromGQL(ingredient));
};

export const mapDishFromGQL = (configuration: ApiConfiguration, dish: GQLDish): Dish => ({
  id: dish.id,
  name: dish.name,
  description: dish.description,
  image: mapImageFromGQL(configuration, dish.imageId),
  weight: dish.weight,
  kal: dish.kal,
  ingredients: mapIngredientsFromGQL(dish.ingredients),
});

export const mapDishesFromGQL = (
  configuration: ApiConfiguration,
  dishes: GQLDish[],
): Dish[] => {
  return dishes.map((dish) => mapDishFromGQL(configuration, dish));
};

export const mapStatusFromGQL = (
  configuration: ApiConfiguration,
  status: GQLStatus,
): Status => ({
  id: status.id,
  name: status.name,
  imageId: mapImageFromGQL(configuration, status.imageId),
});

export const mapStatusesFromGQL = (
  configuration: ApiConfiguration,
  statuses: GQLStatus[],
): Status[] => {
  return statuses.map((status) => mapStatusFromGQL(configuration, status));
};

export const mapSetFromGQL = (configuration: ApiConfiguration, set: GQLSet): Set => ({
  id: set.id,
  name: set.name,
  imageId: mapImageFromGQL(configuration, set.imageId),
  priceCents: set.priceCents,
  cuisineId: set.cuisineId,
  dishes: mapDishesFromGQL(configuration, set.dishes),
  statuses: mapStatusesFromGQL(configuration, set.statuses),
});

export const mapOrderStateFromGQL = (orderState: GQLOrderState): OrderState => {
  switch (orderState) {
    case 'WaitingForPayment':
      return OrderState.WaitingForPayment;
    case 'ReadyForDelivery':
      return OrderState.ReadyForDelivery;
    case 'AcceptedByCourier':
      return OrderState.AcceptedByCourier;
    case 'Delivering':
      return OrderState.Delivering;
    case 'Delivered':
      return OrderState.Delivered;
    case 'Completed':
      return OrderState.Completed;
    default:
      throw new Error('Not implemented');
  }
};

export const mapOrderFromGQL = (
  configuration: ApiConfiguration,
  order: GQLOrder,
): Order => ({
  id: order.id,
  restaurant: mapRestaurantFromGQL(order.restaurant),
  client: mapUserFromGQL(order.client),
  cart: mapCartFromGQL(order.cart),
  bag: order.bag ? mapBagFromGQL(order.bag) : undefined,
  set: mapSetFromGQL(configuration, order.set),
  orderInfo: mapOrderInfoFromGQL(order.orderInfo),
  number: order.number,
  created: order.created,
  placement: order.placement,
  state: mapOrderStateFromGQL(order.state),
  courierId: order.courierId ? order.courierId : undefined,
  courier: order.courier ? mapCourierFromGQL(order.courier) : undefined,
  rating: order.rating ? order.rating : undefined,
});

export const mapOrdersFromGQL = (
  configuration: ApiConfiguration,
  orders: GQLOrder[],
): Order[] => orders.map((order) => mapOrderFromGQL(configuration, order));

export const mapClientsFromGQL = (
  configuration: ApiConfiguration,
  clients: GQLClient[],
): Client[] => clients.map((client) => mapClientFromGQL(configuration, client));

export const mapCouriersFromGQL = (
  configuration: ApiConfiguration,
  couriers: GQLCourier[],
): Courier[] => couriers.map((courier) => mapCourierFromGQL(courier));

export const mapRestaurantsFromGQL = (
  configuration: ApiConfiguration,
  restaurants: GQLRestaurant[],
): Restaurant[] => restaurants.map((restaurant) => mapRestaurantFromGQL(restaurant));

export const mapInformationPagesFromGQL = (
  configuration: ApiConfiguration,
  informationPages: GQLInformationPage[],
): InformationPage[] =>
  informationPages.map((informationPage) =>
    mapInformationPageFromGQL(configuration, informationPage),
  );
