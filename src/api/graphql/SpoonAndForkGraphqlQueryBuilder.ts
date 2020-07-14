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
  InformationPage,
  QueryOrderByIdArgs,
  QueryClientByIdArgs,
  QueryCourierByIdArgs,
  QueryRestaurantByIdArgs,
  QueryInformationPageByIdArgs,
  MutationCreateOrUpdateInformationPageArgs,
  MutationUpdateClientInformationArgs,
  MutationUpdateRestaurantInformationArgs,
  MutationDeleteOrderArgs,
  MutationRemoveTheCurrentCourierArgs,
  MutationUpdateCourierInformationArgs,
} from './types';

const InformationPageFragment = () => gql`
  fragment InformationPage on InformationPage {
    id
    key
    title
    body
  }
`;

const LatLngFragment = () => gql`
  fragment LatLng on LatLng {
    lat
    lng
  }
`;

const AddressFragment = () => gql`
  ${LatLngFragment()}
  fragment Address on Address {
    id
    placeId
    description
    latLng {
      ...LatLng
    }
  }
`;

const UserFragment = () => gql`
  fragment User on User {
    id
    name
    additionalUserInfo {
      email
      phoneNumber
    }
  }
`;

const IngredientFragment = () => gql`
  fragment Ingredient on Ingredient {
    id
    name
  }
`;

const DishFragment = () => gql`
  ${IngredientFragment()}
  fragment Dish on Dish {
    id
    name
    description
    imageId
    weight
    kal
    ingredients {
      ...Ingredient
    }
  }
`;

const StatusFragment = () => gql`
  fragment Status on Status {
    id
    name
    imageId
  }
`;

const SetFragment = () => gql`
  ${StatusFragment()}
  ${DishFragment()}
  fragment Set on Set {
    id
    name
    imageId
    cuisineId
    priceCents
    statuses {
      ...Status
    }
    dishes {
      ...Dish
    }
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
  }
`;

const RestaurantFragment = () => gql`
  fragment Restaurant on Restaurant {
    id
    userId
    imageId
    description
    address {
      ...Address
    }
  }
`;

const CartFragment = () => gql`
  fragment Cart on Cart {
    id
    userId
  }
`;

export const OrderFragment = () => gql`
  ${SetFragment()}
  ${UserFragment()}
  ${AddressFragment()}
  ${RestaurantFragment()}
  ${CourierFragment()}
  ${CartFragment()}
  fragment Order on Order {
    id
    bag {
      id
      code
    }
    set {
      ...Set
    }
    client {
      ...User
    }
    orderInfo {
      priceCents
      distanceMiles
      clientAddress {
        ...Address
      }
    }
    restaurant {
      ...Restaurant
    }
    number
    created
    placement
    state
    courier {
      ...Courier
    }
    rating
    cart {
      ...Cart
    }
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
      $email: String!
      $phoneNumber: String!
    ) {
      updateClientInformation(
        id: $id
        name: $name
        email: $email
        phoneNumber: $phoneNumber
      )
    }
  `,
  () => undefined,
);

export const couriersQuery = createQuery<{couriers: Courier[]}, Courier[]>(
  gql`
    ${UserFragment()}
    ${CourierFragment()}
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
    ${UserFragment()}
    ${CourierFragment()}
    query($courierId: ID!) {
      courierById(courierId: $courierId) {
        ...Courier
      }
    }
  `,
  ({courierById}) => courierById,
);

export const mutationUpdateCourierInformation = createMutationWithVariables<
  MutationUpdateCourierInformationArgs,
  {updateCourierInformation: boolean},
  void
>(
  gql`
    mutation updateCourierInformation(
      $id: ID!
      $name: String!
      $email: String!
      $phoneNumber: String!
    ) {
      updateCourierInformation(
        id: $id
        name: $name
        email: $email
        phoneNumber: $phoneNumber
      )
    }
  `,
  () => undefined,
);

export const restaurantsQuery = createQuery<{restaurants: Restaurant[]}, Restaurant[]>(
  gql`
    ${AddressFragment()}
    ${RestaurantFragment()}
    query {
      restaurants {
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
