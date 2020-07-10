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
  Set as GQLSet,
  Dish as GQLDish,
  Ingredient as GQLIngredient,
  Status as GQLStatus,
  OrderState as GQLOrderState,
  Bag as GQLBag,
  WashingInfo as GQLWashingInfo,
  User as GQLUser,
  Order as GQLOrder,
  OrderInfo as GQLOrderInfo,
  Client as GQLClient,
  Courier as GQLCourier,
  Restaurant as GQLRestaurant,
  InformationPage as GQLInformationPage,
  Document as GQLDocument,
  DocumentGroup as GQLDocumentGroup,
  DocumentsRevisionStatus as GQLDocumentsRevisionStatus,
  DocumentsRevision as GQLDocumentsRevision,
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
import {
  Document,
  DocumentsRevision,
  DocumentsRevisionStatus,
  DocumentsGroups,
} from 'entities/Documents';
import * as R from 'ramda';
import {Bag} from 'entities/Bag';
import Address from 'entities/Address';
import {WashingInfo} from 'entities/WashingInfo';
import OrderInfo from '../entities/OrderInfo';
import CreateOrUpdateInformationPageRequest from 'api/entities/CreateOrUpdateInformationPageRequest';
import UpdateClientInformationRequest from 'api/entities/UpdateClientInformationRequest';
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
  updateClientInformationRequest: UpdateClientInformationRequest,
): UpdateClientInformationRequest => ({
  id: updateClientInformationRequest.id,
  name: updateClientInformationRequest.name,
  email: updateClientInformationRequest.email,
  phoneNumber: updateClientInformationRequest.phoneNumber,
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

export const mapDocumentsRevisionStatusFromGQL = (
  status: GQLDocumentsRevisionStatus,
): DocumentsRevisionStatus => {
  switch (status) {
    case GQLDocumentsRevisionStatus.New:
      return DocumentsRevisionStatus.New;
    case GQLDocumentsRevisionStatus.VerificationRequested:
      return DocumentsRevisionStatus.VerificationRequested;
    case GQLDocumentsRevisionStatus.ChangesRequested:
      return DocumentsRevisionStatus.ChangesRequested;
    case GQLDocumentsRevisionStatus.Approved:
      return DocumentsRevisionStatus.Approved;
    case GQLDocumentsRevisionStatus.Rejected:
      return DocumentsRevisionStatus.Rejected;
  }
};

export const mapDocumentFromGQL = (
  configuration: ApiConfiguration,
  document: GQLDocument,
): Document => ({
  id: document.id,
  image: mapImageFromGQL(configuration, document.fileId),
});

export const mapDocumentsFromGQL = (
  configuration: ApiConfiguration,
  documents: GQLDocument[],
): Document[] => documents.map((d) => mapDocumentFromGQL(configuration, d));

export const mapDocumentsRevisionFromGQL = (
  configuration: ApiConfiguration,
  revision: GQLDocumentsRevision,
): DocumentsRevision => {
  return {
    id: revision.id,
    status: mapDocumentsRevisionStatusFromGQL(revision.status),
    comment: revision.comment,
  };
};

export const mapWashingInfoFromGQL = (washingInfo: GQLWashingInfo): WashingInfo => ({
  weight: washingInfo.weight,
  price: washingInfo.price,
  washingFinish: washingInfo.washingFinish,
});

export const mapAddressFromGQL = (location: GQLAddress): Address => ({
  id: location.id,
  palaceId: location.placeId || undefined,
  description: location.description,
  latLng: location.latLng,
});

export const mapOrderInfoFromGQL = (orderInfo: GQLOrderInfo): OrderInfo => ({
  id: orderInfo.id,
  weight: orderInfo.weight,
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
  client: mapUserFromGQL(order.client),
  restaurant: mapRestaurantFromGQL(order.restaurant),
  bag: order.bag ? mapBagFromGQL(order.bag) : undefined,
  set: mapSetFromGQL(configuration, order.set),
  number: order.number,
  orderInfo: mapOrderInfoFromGQL(order.orderInfo),
  created: order.created,
  placement: order.placement,
  state: mapOrderStateFromGQL(order.state),
  courierId: order.courierId ? order.courierId : undefined,
  courier: order.courier ? mapCourierFromGQL(order.courier) : undefined,
  rating: order.rating ? order.rating : undefined,
});

export const groupDocumentFromGQL = (
  configuration: ApiConfiguration,
  documents: GQLDocument[],
): DocumentsGroups => {
  const groupSelector = ({group}: GQLDocument) => group;
  const groups = R.groupBy(groupSelector)(documents);
  return {
    w4: groups[GQLDocumentGroup.W4]
      ? mapDocumentsFromGQL(configuration, groups[GQLDocumentGroup.W4])
      : [],
    licensePlate: groups[GQLDocumentGroup.LicensePlate]
      ? mapDocumentsFromGQL(configuration, groups[GQLDocumentGroup.LicensePlate])
      : [],
    driversLicense: groups[GQLDocumentGroup.DriversLicense]
      ? mapDocumentsFromGQL(configuration, groups[GQLDocumentGroup.DriversLicense])
      : [],
    carRegistration: groups[GQLDocumentGroup.CarRegistration]
      ? mapDocumentsFromGQL(configuration, groups[GQLDocumentGroup.CarRegistration])
      : [],
    carInsurance: groups[GQLDocumentGroup.CarInsurance]
      ? mapDocumentsFromGQL(configuration, groups[GQLDocumentGroup.CarInsurance])
      : [],
  };
};

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
