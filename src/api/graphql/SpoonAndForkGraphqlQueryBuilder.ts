import {
  createQuery,
  createMutationWithVariables,
  createQueryWithVariables,
} from '@spryrocks/react-api/graphql/Query';
import {gql} from 'apollo-boost';
import {
  Account,
  Order,
  Client,
  Courier,
  Restaurant,
  Document,
  InformationPage,
  MutationEvaluateDocumentsRevisionArgs,
  QueryOrderByIdArgs,
  QueryClientByIdArgs,
  QueryCourierByIdArgs,
  QueryRestaurantByIdArgs,
  QueryInformationPageByIdArgs,
  QueryDocumentsArgs,
  MutationCreateOrUpdateInformationPageArgs,
  MutationUpdateClientInformationArgs,
  MutationUpdateRestaurantInformationArgs,
  MutationDeleteOrderArgs,
  MutationRemoveTheCurrentCourierArgs,
} from './types';

const InformationPageFragment = () => gql`
  fragment InformationPage on InformationPage {
    id
    key
    title
    body
  }
`;

const AdditionalUserInfoFragment = () => gql`
  fragment AdditionalUserInfo on AdditionalUserInfo {
    phoneNumber
    email
  }
`;

const DocumentsRevisionFragment = () => gql`
  fragment DocumentsRevision on DocumentsRevision {
    id
    status
    comment
  }
`;

const LatLngFragment = () => gql`
  fragment LatLng on LatLng {
    lat
    lng
  }
`;

const AddressFragment = () => gql`
  fragment Address on Address {
    id
    placeId
    description
    latLng {
      ...LatLng
    }
  }
`;

const WashingInfoFragment = () => gql`
  fragment WashingInfo on WashingInfo {
    weight
    price
    washingFinish
  }
`;

const OrderInfoFragment = () => gql`
  fragment OrderInfo on OrderInfo {
    id
    weight
    distanceMiles
    priceCents
    clientAddress {
      ...Address
    }
    isOneWay
  }
`;

const UserFragment = () => gql`
  fragment User on User {
    id
    name
    image
    birthday
    additionalUserInfo {
      ...AdditionalUserInfo
    }
  }
`;

const BagFragment = () => gql`
  fragment Bag on Bag {
    id
    code
  }
`;

const OrderFragment = () => gql`
  fragment Order on Order {
    id
    restaurant {
      ...Restaurant
    }
    client {
      ...User
    }
    bags {
      ...Bag
    }
    orderInfo {
      ...OrderInfo
    }
    comment
    number
    created
    placement
    state
    washingInfo {
      ...WashingInfo
    }
    firstCourierId
    secondCourierId
    preferredService
  }
`;

const ClientFragment = () => gql`
  fragment Client on Client {
    id
    user {
      ...User
    }
  }
`;

const CourierFragment = () => gql`
  fragment Courier on Courier {
    id
    user {
      ...User
    }
    revision {
      ...DocumentsRevision
    }
  }
`;

const RestaurantFragment = () => gql`
  fragment Restaurant on Restaurant {
    additionalInfo
    address {
      ...Address
    }
    website
    id
    imageId
    title
    beginningOfWorkingDay
    endOfWorkingDay
    imageId
    contactPerson
    phoneNumber
    services
  }
`;

const DocumentFragment = () => gql`
  fragment Document on Document {
    id
    group
    fileId
  }
`;

export const myAccountQuery = createQuery<{myAccount: Account}, Account>(
  gql`
    query myAccount {
      myAccount {
        user {
          id
          name
          birthday
          image
        }
        info {
          email
          phoneNumber
        }
      }
    }
  `,
  ({myAccount}) => myAccount,
);

export const mutationUpdateMyAccountImage = createMutationWithVariables<
  {
    image: String;
  },
  {updateMyAccountImage: boolean},
  undefined
>(
  gql`
    mutation updateMyAccountImage($image: String!) {
      updateMyAccountImage(image: $image)
    }
  `,
  () => undefined,
);

export const ordersQuery = createQuery<{orders: Order[]}, Order[]>(
  gql`
    ${LatLngFragment()}
    ${AddressFragment()}
    ${RestaurantFragment()}
    ${AdditionalUserInfoFragment()}
    ${UserFragment()}
    ${BagFragment()}
    ${LatLngFragment()}
    ${AddressFragment()}
    ${OrderInfoFragment()}
    ${WashingInfoFragment()}
    ${OrderFragment()}
    query {
      orders {
        ...Order
      }
    }
  `,
  ({orders}) => orders,
);

export const mutationCreateOrUpdateInformationPage = createMutationWithVariables<
  MutationCreateOrUpdateInformationPageArgs,
  {createOrUpdateInformationPage: InformationPage},
  InformationPage
>(
  gql`
    ${InformationPageFragment()}
    mutation createOrUpdateInformationPage(
      $key: String!
      $title: String!
      $body: String!
    ) {
      createOrUpdateInformationPage(key: $key, title: $title, body: $body) {
        ...InformationPage
      }
    }
  `,
  ({createOrUpdateInformationPage}) => createOrUpdateInformationPage,
);

export const orderByIdQuery = createQueryWithVariables<
  QueryOrderByIdArgs,
  {orderById: Order},
  Order
>(
  gql`
    ${LatLngFragment()}
    ${AddressFragment()}
    ${RestaurantFragment()}
    ${AdditionalUserInfoFragment()}
    ${UserFragment()}
    ${BagFragment()}
    ${LatLngFragment()}
    ${AddressFragment()}
    ${OrderInfoFragment()}
    ${WashingInfoFragment()}
    ${OrderFragment()}
    query($id: ID!) {
      orderById(id: $id) {
        ...Order
      }
    }
  `,
  ({orderById}) => orderById,
);

export const clientsQuery = createQuery<{clients: Client[]}, Client[]>(
  gql`
    ${AdditionalUserInfoFragment()}
    ${UserFragment()}
    ${ClientFragment()}
    query {
      clients {
        ...Client
      }
    }
  `,
  ({clients}) => clients,
);

export const clientByIdQuery = createQueryWithVariables<
  QueryClientByIdArgs,
  {clientById: Client},
  Client
>(
  gql`
    ${AdditionalUserInfoFragment()}
    ${UserFragment()}
    ${ClientFragment()}
    query($clientId: ID!) {
      clientById(clientId: $clientId) {
        ...Client
      }
    }
  `,
  ({clientById}) => clientById,
);

export const mutationUpdateClientInformation = createMutationWithVariables<
  MutationUpdateClientInformationArgs,
  {updateClientInformation: boolean},
  void
>(
  gql`
    mutation updateClientInformation(
      $id: ID!
      $name: String!
      $birthday: DateTime!
      $email: String!
      $phoneNumber: String!
    ) {
      updateClientInformation(
        id: $id
        name: $name
        birthday: $birthday
        email: $email
        phoneNumber: $phoneNumber
      )
    }
  `,
  () => undefined,
);

export const couriersQuery = createQuery<{couriers: Courier[]}, Courier[]>(
  gql`
    ${AdditionalUserInfoFragment()}
    ${UserFragment()}
    ${CourierFragment()}
    ${DocumentsRevisionFragment()}
    query {
      couriers {
        ...Courier
      }
    }
  `,
  ({couriers}) => couriers,
);

export const courierByIdQuery = createQueryWithVariables<
  QueryCourierByIdArgs,
  {courierById: Courier},
  Courier
>(
  gql`
    ${AdditionalUserInfoFragment()}
    ${UserFragment()}
    ${CourierFragment()}
    ${DocumentsRevisionFragment()}
    query($courierId: ID!) {
      courierById(courierId: $courierId) {
        ...Courier
      }
    }
  `,
  ({courierById}) => courierById,
);

export const restaurantsQuery = createQuery<{restaurants: Restaurant[]}, Restaurant[]>(
  gql`
    ${LatLngFragment()}
    ${AddressFragment()}
    ${RestaurantFragment()}
    query {
      restaurant {
        ...Restaurant
      }
    }
  `,
  ({restaurants}) => restaurants,
);

export const restaurantByIdQuery = createQueryWithVariables<
  QueryRestaurantByIdArgs,
  {restaurantById: Restaurant},
  Restaurant
>(
  gql`
    ${LatLngFragment()}
    ${AddressFragment()}
    ${RestaurantFragment()}
    query($restaurantId: ID!) {
      restaurantById(restaurantId: $restaurantId) {
        ...Restaurant
      }
    }
  `,
  ({restaurantById}) => restaurantById,
);

export const mutationUpdateRestaurantInformation = createMutationWithVariables<
  MutationUpdateRestaurantInformationArgs,
  {updateRestaurantInformation: boolean},
  void
>(
  gql`
    mutation updateRestaurantInformation(
      $id: ID!
      $title: String!
      $additionalInfo: String!
      $contactPerson: String!
      $website: String!
      $addressDescription: String!
      $lat: Float!
      $lng: Float!
      $beginningOfWorkingDay: DateTime!
      $endOfWorkingDay: DateTime!
      $phoneNumber: String!
      $services: String!
    ) {
      updateRestaurantInformation(
        id: $id
        title: $title
        additionalInfo: $additionalInfo
        contactPerson: $contactPerson
        website: $website
        addressDescription: $addressDescription
        lat: $lat
        lng: $lng
        beginningOfWorkingDay: $beginningOfWorkingDay
        endOfWorkingDay: $endOfWorkingDay
        phoneNumber: $phoneNumber
        services: $services
      )
    }
  `,
  () => undefined,
);

export const informationPagesQuery = createQuery<
  {informationPages: InformationPage[]},
  InformationPage[]
>(
  gql`
    ${InformationPageFragment()}
    query {
      informationPages {
        ...InformationPage
      }
    }
  `,
  ({informationPages}) => informationPages,
);

export const informationPageByIdQuery = createQueryWithVariables<
  QueryInformationPageByIdArgs,
  {informationPageById: InformationPage},
  InformationPage
>(
  gql`
    ${InformationPageFragment()}
    query($informationPageId: ID!) {
      informationPageById(informationPageId: $informationPageId) {
        ...InformationPage
      }
    }
  `,
  ({informationPageById}) => informationPageById,
);

export const evaluateDocumentsRevisionMutation = createMutationWithVariables<
  MutationEvaluateDocumentsRevisionArgs,
  {evaluateDocumentsRevision: boolean},
  void
>(
  gql`
    mutation($courierId: ID!, $type: EvaluateDocumentsRevisionType!, $comment: String!) {
      evaluateDocumentsRevision(courierId: $courierId, type: $type, comment: $comment)
    }
  `,
  () => undefined,
);

export const documentsQuery = createQueryWithVariables<
  QueryDocumentsArgs,
  {documents: Document[]},
  Document[]
>(
  gql`
    ${DocumentFragment()}
    query($revisionId: ID!) {
      documents(revisionId: $revisionId) {
        ...Document
      }
    }
  `,
  ({documents}) => documents,
);

export const deleteOrderMutation = createMutationWithVariables<
  MutationDeleteOrderArgs,
  {deleteOrder: boolean},
  boolean
>(
  gql`
    mutation($orderId: ID!) {
      deleteOrder(orderId: $orderId)
    }
  `,
  ({deleteOrder}) => deleteOrder,
);

export const removeTheCurrentCourierMutation = createMutationWithVariables<
  MutationRemoveTheCurrentCourierArgs,
  {removeTheCurrentCourier: boolean},
  boolean
>(
  gql`
    mutation($orderId: ID!) {
      removeTheCurrentCourier(orderId: $orderId)
    }
  `,
  ({removeTheCurrentCourier}) => removeTheCurrentCourier,
);
