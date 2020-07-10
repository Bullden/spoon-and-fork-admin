import RegisterRequest from '@spryrocks/react-auth/RegisterRequest';
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
  Bag as GQLBag,
  WashingInfo as GQLWashingInfo,
  User as GQLUser,
  Order as GQLOrder,
  OrderInfo as GQLOrderInfo,
  Client as GQLClient,
  Courier as GQLCourier,
  Laundry as GQLLaundry,
  InformationPage as GQLInformationPage,
  Document as GQLDocument,
  DocumentGroup as GQLDocumentGroup,
  DocumentsRevisionStatus as GQLDocumentsRevisionStatus,
  DocumentsRevision as GQLDocumentsRevision,
} from './graphql/types';
import Order from 'entities/Order';
import Client from 'entities/Client';
import Courier from 'entities/Courier';
import Laundry from 'entities/Laundry';
import InformationPage from 'entities/InformationPage';
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
import UpdateLaundryInformationRequest from './entities/UpdateLaundryInformationRequest';

export const mapRegisterRequestToApi = (
  registerRequest: RegisterRequest,
): ApiRegisterRequest => ({
  name: registerRequest.name,
  email: registerRequest.email,
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
  birthday: updateClientInformationRequest.birthday,
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

export const mapUserFromGQL = (configuration: ApiConfiguration, user: GQLUser): User => ({
  id: user.id,
  name: user.name,
  birthday: user.birthday,
  image: mapImageFromGQL(configuration, user.image),
  additionalUserInfo: user.additionalUserInfo
    ? mapAdditionalUserInfoFromGQL(user.additionalUserInfo)
    : undefined,
});

export const mapMyAccountFromGQL = (
  configuration: ApiConfiguration,
  account: GQLAccount,
): Account => ({
  info: mapAdditionalUserInfoFromGQL(account.info),
  user: mapUserFromGQL(configuration, account.user),
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
  placeId: location.placeId || undefined,
  description: location.description,
  latLng: location.latLng,
});

export const mapOrderInfoFromGQL = (
  configuration: ApiConfiguration,
  orderInfo: GQLOrderInfo,
): OrderInfo => ({
  id: orderInfo.id,
  weight: orderInfo.weight,
  distanceMiles: orderInfo.distanceMiles,
  priceCents: orderInfo.priceCents,
  clientAddress: mapAddressFromGQL(orderInfo.clientAddress),
  isOneWay: orderInfo.isOneWay,
});

export const mapClientFromGQL = (
  configuration: ApiConfiguration,
  client: GQLClient,
): Client => ({
  id: client.id,
  user: mapUserFromGQL(configuration, client.user),
});

export const mapCourierFromGQL = (
  configuration: ApiConfiguration,
  courier: GQLCourier,
): Courier => ({
  id: courier.id,
  user: mapUserFromGQL(configuration, courier.user),
  revision: courier.revision
    ? mapDocumentsRevisionFromGQL(configuration, courier.revision)
    : undefined,
});

export const mapLaundryFromGQL = (
  configuration: ApiConfiguration,
  laundry: GQLLaundry,
): Laundry => ({
  id: laundry.id,
  title: laundry.title,
  image: mapImageFromGQL(configuration, laundry.imageId),
  additionalInfo: laundry.additionalInfo,
  contactPerson: laundry.contactPerson,
  website: laundry.website,
  address: mapAddressFromGQL(laundry.address),
  beginningOfWorkingDay: laundry.beginningOfWorkingDay,
  endOfWorkingDay: laundry.endOfWorkingDay,
  phoneNumber: laundry.phoneNumber,
  services: laundry.services,
});

export const mapUpdateLaundryInformationRequestToGQL = (
  updateLaundryInformationRequest: UpdateLaundryInformationRequest,
): UpdateLaundryInformationRequest => ({
  id: updateLaundryInformationRequest.id,
  title: updateLaundryInformationRequest.title,
  additionalInfo: updateLaundryInformationRequest.additionalInfo,
  contactPerson: updateLaundryInformationRequest.contactPerson,
  website: updateLaundryInformationRequest.website,
  addressDescription: updateLaundryInformationRequest.addressDescription,
  lat: updateLaundryInformationRequest.lat,
  lng: updateLaundryInformationRequest.lng,
  beginningOfWorkingDay: updateLaundryInformationRequest.beginningOfWorkingDay,
  endOfWorkingDay: updateLaundryInformationRequest.endOfWorkingDay,
  phoneNumber: updateLaundryInformationRequest.phoneNumber,
  services: updateLaundryInformationRequest.services,
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

export const mapOrderFromGQL = (
  configuration: ApiConfiguration,
  order: GQLOrder,
): Order => ({
  id: order.id,
  laundry: mapLaundryFromGQL(configuration, order.laundry),
  client: mapUserFromGQL(configuration, order.client),
  bags: mapBagsFromGQL(order.bags),
  orderInfo: mapOrderInfoFromGQL(configuration, order.orderInfo),
  comment: order.comment,
  number: order.number,
  created: order.created,
  placement: order.placement,
  state: order.state,
  washingInfo: order.washingInfo ? mapWashingInfoFromGQL(order.washingInfo) : undefined,
  firstCourierId: order.firstCourierId ? order.firstCourierId : '',
  secondCourierId: order.secondCourierId ? order.secondCourierId : '',
  preferredService: order.preferredService,
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
): Courier[] => couriers.map((courier) => mapCourierFromGQL(configuration, courier));

export const mapLaundriesFromGQL = (
  configuration: ApiConfiguration,
  laundries: GQLLaundry[],
): Laundry[] => laundries.map((laundry) => mapLaundryFromGQL(configuration, laundry));

export const mapInformationPagesFromGQL = (
  configuration: ApiConfiguration,
  informationPages: GQLInformationPage[],
): InformationPage[] =>
  informationPages.map((informationPage) =>
    mapInformationPageFromGQL(configuration, informationPage),
  );
