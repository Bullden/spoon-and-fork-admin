import {
  createMutationWithVariables,
  createQuery,
  createQueryWithVariables,
} from '@spryrocks/react-api/graphql/Query';
import {gql} from 'apollo-boost';
import {
  Account,
  Client,
  Courier,
  Cuisine,
  Dish,
  Document,
  MutationCreateCuisineArgs,
  MutationCreateDishArgs,
  MutationCreateSetArgs,
  MutationCreateStatusArgs,
  MutationDeleteOrderArgs,
  MutationEvaluateDocumentsRevisionArgs,
  MutationRemoveTheCurrentCourierArgs,
  MutationUpdateClientInformationArgs,
  MutationUpdateCourierInformationArgs,
  MutationUpdateCuisineArgs,
  MutationUpdateDishArgs,
  MutationUpdateRestaurantInformationArgs,
  MutationUpdateSetArgs,
  MutationUpdateStatusArgs,
  Order,
  QueryClientByIdArgs,
  QueryCourierByIdArgs,
  QueryCuisineByIdArgs,
  QueryDishByIdArgs,
  QueryDocumentsArgs,
  QueryOrderByIdArgs,
  QueryRestaurantByIdArgs,
  QuerySetByIdArgs,
  QuerySetsByDishIdArgs,
  QueryStatusByIdArgs,
  Restaurant,
  Set,
  Status,
} from './types';

const DocumentsRevisionFragment = () => gql`
  fragment DocumentsRevision on DocumentsRevision {
    id
    status
    comment
  }
`;

const DocumentFragment = () => gql`
  fragment Document on Document {
    id
    group
    fileId
  }
`;

const AddressFragment = () => gql`
  fragment Address on Address {
    id
    placeId
    description
    lat
    lng
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
  ${DocumentsRevisionFragment()}
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

const CuisineFragment = () => gql`
  fragment Cuisine on Cuisine {
    id
    imageId
    nationality
    count
    rating
  }
`;

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

export const mutationUpdateCuisine = createMutationWithVariables<
  MutationUpdateCuisineArgs,
  {updateCuisine: Cuisine},
  Cuisine
>(
  gql`
    ${CuisineFragment()}
    mutation updateCuisine(
      $id: String!
      $image: String!
      $nationality: String!
      $count: String!
      $rating: String!
    ) {
      updateCuisine(
        id: $id
        imageId: $image
        nationality: $nationality
        count: $count
        rating: $rating
      ) {
        ...Cuisine
      }
    }
  `,
  ({updateCuisine}) => updateCuisine,
);

export const mutationCreateCuisine = createMutationWithVariables<
  MutationCreateCuisineArgs,
  {createCuisine: Boolean},
  void
>(
  gql`
    mutation createCuisine(
      $image: String!
      $nationality: String!
      $count: String!
      $rating: String!
    ) {
      createCuisine(
        imageId: $image
        nationality: $nationality
        count: $count
        rating: $rating
      )
    }
  `,
  ({createCuisine}) => createCuisine,
);

export const mutationUpdateStatus = createMutationWithVariables<
  MutationUpdateStatusArgs,
  {updateStatus: Status},
  Status
>(
  gql`
    ${StatusFragment()}
    mutation updateStatus($id: String!, $image: String!, $name: String!) {
      updateStatus(id: $id, imageId: $image, name: $name) {
        ...Status
      }
    }
  `,
  ({updateStatus}) => updateStatus,
);

export const mutationCreateStatus = createMutationWithVariables<
  MutationCreateStatusArgs,
  {createStatus: Boolean},
  void
>(
  gql`
    mutation createStatus($image: String!, $name: String!) {
      createStatus(imageId: $image, name: $name)
    }
  `,
  ({createStatus}) => createStatus,
);

export const mutationUpdateDish = createMutationWithVariables<
  MutationUpdateDishArgs,
  {updateDish: Dish},
  Dish
>(
  gql`
    ${DishFragment()}
    mutation updateDish(
      $id: String!
      $name: String!
      $description: String!
      $image: String!
      $weight: String!
      $kal: String!
      $ingredients: [String!]!
      $sets: [String!]!
    ) {
      updateDish(
        id: $id
        name: $name
        description: $description
        imageId: $image
        weight: $weight
        kal: $kal
        ingredients: $ingredients
        sets: $sets
      ) {
        ...Dish
      }
    }
  `,
  ({updateDish}) => updateDish,
);

export const mutationCreateDish = createMutationWithVariables<
  MutationCreateDishArgs,
  {createDish: Boolean},
  void
>(
  gql`
    mutation createDish(
      $name: String!
      $description: String!
      $image: String!
      $weight: String!
      $kal: String!
      $ingredients: [String!]!
      $sets: [String!]!
    ) {
      createDish(
        name: $name
        description: $description
        imageId: $image
        weight: $weight
        kal: $kal
        ingredients: $ingredients
        sets: $sets
      )
    }
  `,
  ({createDish}) => createDish,
);

export const mutationUpdateSet = createMutationWithVariables<
  MutationUpdateSetArgs,
  {updateSet: Set},
  Set
>(
  gql`
    ${SetFragment()}
    mutation updateSet(
      $id: String!
      $name: String!
      $cuisineId: String!
      $image: String!
      $priceCents: String!
      $dishes: [String!]!
      $statuses: [String!]!
    ) {
      updateSet(
        id: $id
        name: $name
        cuisineId: $cuisineId
        imageId: $image
        priceCents: $priceCents
        dishes: $dishes
        statuses: $statuses
      ) {
        ...Set
      }
    }
  `,
  ({updateSet}) => updateSet,
);

export const mutationCreateSet = createMutationWithVariables<
  MutationCreateSetArgs,
  {createSet: Boolean},
  void
>(
  gql`
    mutation createSet(
      $name: String!
      $cuisineId: String!
      $image: String!
      $priceCents: String!
      $dishes: [String!]!
      $statuses: [String!]!
    ) {
      createSet(
        name: $name
        cuisineId: $cuisineId
        imageId: $image
        priceCents: $priceCents
        dishes: $dishes
        statuses: $statuses
      )
    }
  `,
  ({createSet}) => createSet,
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

export const cuisinesQuery = createQuery<{cuisines: Cuisine[]}, Cuisine[]>(
  gql`
    ${CuisineFragment()}
    query {
      cuisines {
        ...Cuisine
      }
    }
  `,
  ({cuisines}) => cuisines,
);

export const cuisineByIdQuery = createQueryWithVariables<
  QueryCuisineByIdArgs,
  {cuisineById: Cuisine},
  Cuisine
>(
  gql`
    ${CuisineFragment()}
    query($id: String!) {
      cuisineById(id: $id) {
        ...Cuisine
      }
    }
  `,
  ({cuisineById}) => cuisineById,
);

export const dishesQuery = createQuery<{dishes: Dish[]}, Dish[]>(
  gql`
    ${DishFragment()}
    query {
      dishes {
        ...Dish
      }
    }
  `,
  ({dishes}) => dishes,
);

export const dishByIdQuery = createQueryWithVariables<
  QueryDishByIdArgs,
  {dishById: Dish},
  Dish
>(
  gql`
    ${DishFragment()}
    query($id: String!) {
      dishById(id: $id) {
        ...Dish
      }
    }
  `,
  ({dishById}) => dishById,
);

export const setsQuery = createQuery<{sets: Set[]}, Set[]>(
  gql`
    ${SetFragment()}
    query {
      sets {
        ...Set
      }
    }
  `,
  ({sets}) => sets,
);

export const setByIdQuery = createQueryWithVariables<
  QuerySetByIdArgs,
  {setById: Set},
  Set
>(
  gql`
    ${SetFragment()}
    query($id: String!) {
      setById(id: $id) {
        ...Set
      }
    }
  `,
  ({setById}) => setById,
);

export const setsByDishIdQuery = createQueryWithVariables<
  QuerySetsByDishIdArgs,
  {setsByDishId: Set[]},
  Set[]
>(
  gql`
    ${SetFragment()}
    query($id: String!) {
      setsByDishId(id: $id) {
        ...Set
      }
    }
  `,
  ({setsByDishId}) => setsByDishId,
);

export const statusesQuery = createQuery<{statuses: Status[]}, Status[]>(
  gql`
    ${StatusFragment()}
    query {
      statuses {
        ...Status
      }
    }
  `,
  ({statuses}) => statuses,
);

export const statusByIdQuery = createQueryWithVariables<
  QueryStatusByIdArgs,
  {statusById: Status},
  Status
>(
  gql`
    ${StatusFragment()}
    query($id: String!) {
      statusById(id: $id) {
        ...Status
      }
    }
  `,
  ({statusById}) => statusById,
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
