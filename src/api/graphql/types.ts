export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
};

export type Account = {
   __typename?: 'Account',
  user: User,
  info: AdditionalUserInfo,
  preferences: Preferences,
};

export type AdditionalUserInfo = {
   __typename?: 'AdditionalUserInfo',
  phoneNumber: Scalars['String'],
  email: Scalars['String'],
};

export type Address = {
   __typename?: 'Address',
  id: Scalars['ID'],
  placeId?: Maybe<Scalars['String']>,
  latLng: LatLng,
  description: Scalars['String'],
};

export type Bag = {
   __typename?: 'Bag',
  id: Scalars['ID'],
  code: Scalars['String'],
};

export type Client = {
   __typename?: 'Client',
  id: Scalars['String'],
  user: User,
};

export type Courier = {
   __typename?: 'Courier',
  id: Scalars['String'],
  user: User,
};

export type CreateAddressRequest = {
  placeId?: Maybe<Scalars['String']>,
  latLng: LatLngInput,
  description: Scalars['String'],
};

export type InformationPage = {
   __typename?: 'InformationPage',
  id: Scalars['ID'],
  key: Scalars['String'],
  title: Scalars['String'],
  body: Scalars['String'],
};

export type LatLng = {
   __typename?: 'LatLng',
  lat: Scalars['Float'],
  lng: Scalars['Float'],
};

export type LatLngInput = {
  lat: Scalars['Float'],
  lng: Scalars['Float'],
};

export type Restaurant = {
  __typename?: 'Restaurant';
  id: Scalars['ID'];
  userId: Scalars['String'];
  imageId: Scalars['String'];
  description: Scalars['String'];
  address: Address;
};

export type Cuisine = {
  __typename?: 'Cuisine';
  id: Scalars['ID'];
  imageId: Scalars['String'];
  nationality: Scalars['String'];
  count: Scalars['String'];
  rating: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation',
  updateMyAccount: Account,
  updateMyAccountPreferences: Account,
  updateMyAccountImage: Scalars['Boolean'],
  createRestaurant: Restaurant,
  updateRestaurantInformation: Scalars['Boolean'],
  setIsAvailable: Scalars['Boolean'],
  updateRestaurant: Scalars['Boolean'],
  createOrder: Order,
  evaluateOrder: Scalars['Boolean'],
  payForOrder: RequestedPayment,
  payForTips: RequestedPayment,
  payForWashing: RequestedPayment,
  setWashingInfo: Scalars['Boolean'],
  acceptOrder: Scalars['Boolean'],
  markOrder: Scalars['Boolean'],
  deleteOrder: Scalars['Boolean'],
  removeTheCurrentCourier: Scalars['Boolean'],
  addDocument: Document,
  deleteDocument: Scalars['Boolean'],
  updateLocation: Scalars['Boolean'],
  updateClientInformation: Scalars['Boolean'],
  createOrUpdateInformationPage: InformationPage,
  getPaid: Scalars['Boolean'],
  setPaypalId: Scalars['Boolean'],
};


export type MutationUpdateMyAccountArgs = {
  user: UserUpdateRequest
};


export type MutationUpdateMyAccountPreferencesArgs = {
  allowNotifications: Scalars['Boolean']
};


export type MutationUpdateMyAccountImageArgs = {
  image: Scalars['String']
};


export type MutationCreateRestaurantArgs = {
  phoneNumber: Scalars['String'],
  services: Scalars['String'],
  workHours: WorkHours,
  address: CreateAddressRequest,
  contactPerson: Scalars['String'],
  additionalInfo: Scalars['String'],
  website: Scalars['String'],
  image: Scalars['ID'],
  title: Scalars['String']
};


export type MutationUpdateRestaurantInformationArgs = {
  lng: Scalars['Float'],
  lat: Scalars['Float'],
  addressDescription: Scalars['String'],
  id: Scalars['ID'],
  description: Scalars['String'],
};


export type MutationSetIsAvailableArgs = {
  isAvailable: Scalars['Boolean']
};


export type MutationUpdateRestaurantArgs = {
  phoneNumber: Scalars['String'],
  services: Scalars['String'],
  endOfWorkingDay: Scalars['DateTime'],
  beginningOfWorkingDay: Scalars['DateTime'],
  address: CreateAddressRequest,
  contactPerson: Scalars['String'],
  additionalInfo: Scalars['String'],
  website: Scalars['String'],
  image: Scalars['String'],
  title: Scalars['String']
};


export type MutationCreateOrderArgs = {
  preferredService: Scalars['String'],
  isOneWay: Scalars['Boolean'],
  latLng?: Maybe<LatLngInput>,
  unlockCode: Scalars['String'],
  comment: Scalars['String'],
  clientAddress: CreateAddressRequest,
  weight: Scalars['Float'],
  bagIds: Array<Scalars['String']>,
  restaurantId: Scalars['String']
};


export type MutationEvaluateOrderArgs = {
  rating: Scalars['Float'],
  id: Scalars['String']
};


export type MutationPayForOrderArgs = {
  id: Scalars['String']
};


export type MutationPayForTipsArgs = {
  secondCourierTipsValue?: Maybe<Scalars['Float']>,
  firstCourierTipsValue?: Maybe<Scalars['Float']>,
  id: Scalars['String']
};


export type MutationPayForWashingArgs = {
  id: Scalars['String']
};


export type MutationSetWashingInfoArgs = {
  washingFinish: Scalars['DateTime'],
  price: Scalars['Float'],
  weight: Scalars['Float'],
  orderId: Scalars['String']
};


export type MutationAcceptOrderArgs = {
  id: Scalars['String']
};


export type MutationMarkOrderArgs = {
  latLng?: Maybe<LatLngInput>,
  action: Scalars['String'],
  bagIds: Array<Scalars['String']>,
  orderId: Scalars['String']
};


export type MutationDeleteOrderArgs = {
  orderId: Scalars['ID']
};


export type MutationRemoveTheCurrentCourierArgs = {
  orderId: Scalars['ID']
};


export type MutationUpdateLocationArgs = {
  latLng: LatLngInput
};


export type MutationUpdateClientInformationArgs = {
  phoneNumber: Scalars['String'],
  email: Scalars['String'],
  name: Scalars['String'],
  id: Scalars['ID']
};


export type MutationUpdateCourierInformationArgs = {
  phoneNumber: Scalars['String'],
  email: Scalars['String'],
  name: Scalars['String'],
  id: Scalars['ID']
};


export type MutationUpdateCuisineArgs = {
  id: Scalars['String'],
  image: Scalars['String'],
  nationality: Scalars['String'],
  count: Scalars['String'],
  rating: Scalars['String']
};


export type MutationCreateCuisineArgs = {
  image: Scalars['String'],
  nationality: Scalars['String'],
  count: Scalars['String'],
  rating: Scalars['String']
};


export type MutationUpdateDishArgs = {
  id: Scalars['String'],
  name: Scalars['String'];
  description: Scalars['String'];
  image: Scalars['String'];
  weight: Scalars['String'];
  kal: Scalars['String'];
  ingredients: Array<Scalars['String']>;
};


export type MutationCreateDishArgs = {
  name: Scalars['String'];
  description: Scalars['String'];
  image: Scalars['String'];
  weight: Scalars['String'];
  kal: Scalars['String'];
  ingredients: Array<Scalars['String']>;
};


export type MutationUpdateSetArgs = {
  id: Scalars['String'],
  name: Scalars['String'];
  cuisineId: Scalars['String'];
  image: Scalars['String'];
  priceCents: Scalars['String'];
  dishes: Array<Scalars['String']>;
  statuses: Array<Scalars['String']>;
};


export type MutationCreateSetArgs = {
  name: Scalars['String'];
  cuisineId: Scalars['String'];
  image: Scalars['String'];
  priceCents: Scalars['String'];
  dishes: Array<Scalars['String']>;
  statuses: Array<Scalars['String']>;
};


export type MutationGetPaidArgs = {
  amount: Scalars['Int']
};


export type MutationSetPaypalIdArgs = {
  code: Scalars['String']
};

export type Order = {
  __typename?: 'Order';
  id: Scalars['String'];
  client: User;
  restaurant: Restaurant;
  cart: Cart;
  bag: Maybe<Bag>;
  set: Set;
  number: Scalars['Float'];
  orderInfo: OrderInfo;
  created: Scalars['DateTime'];
  placement: OrderPlacement;
  state: OrderState;
  courierId?: Maybe<Scalars['String']>;
  courier?: Maybe<Courier>;
  rating?: Maybe<Scalars['String']>;
};

export type OrderInfo = {
  __typename?: 'OrderInfo';
  id: Scalars['String'];
  weight: Scalars['Float'];
  clientAddress: Address;
  distanceMiles: Scalars['Float'];
  priceCents: Scalars['Int'];
};

export enum OrderPlacement {
  Client = 'Client',
  Restaurant = 'Restaurant'
}

export type Cart = {
  __typename?: 'Cart';
  id: Scalars['ID'];
  userId: Scalars['String'];
};

export type Ingredient = {
  __typename?: 'Ingredient';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Status = {
  __typename?: 'Status';
  id: Scalars['ID'];
  name: Scalars['String'];
  imageId: Scalars['String'];
};

export type Dish = {
  __typename?: 'Dish';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  imageId: Scalars['String'];
  weight: Scalars['String'];
  kal: Scalars['String'];
  ingredients: Array<Ingredient>;
};

export type Set = {
  __typename?: 'Set';
  id: Scalars['ID'];
  name: Scalars['String'];
  imageId: Scalars['String'];
  cuisineId: Scalars['String'];
  priceCents: Scalars['Int'];
  dishes: Array<Dish>;
  statuses: Array<Status>;
};

export enum OrderState {
  WaitingForPayment = 'WaitingForPayment',
  ReadyForDelivery = 'ReadyForDelivery',
  AcceptedByCourier = 'AcceptedByCourier',
  AcceptedByRestaurant = 'AcceptedByRestaurant',
  Delivering = 'Delivering',
  Delivered = 'Delivered',
  Completed = 'Completed'
}

export type Preferences = {
   __typename?: 'Preferences',
  allowNotifications: Scalars['Boolean'],
};

export type Query = {
   __typename?: 'Query',
  myAccount: Account,
  restaurantById: Restaurant,
  currentRestaurant?: Maybe<Restaurant>,
  restaurants: Array<Restaurant>,
  orders: Array<Order>,
  orderById: Order,
  orderState: OrderState,
  ordersForDelivery: Array<Order>,
  ordersForWash: Array<Order>,
  orderHistory: Array<Order>,
  currentOrder?: Maybe<Order>,
  bagByCode: Bag,
  bagsByOrderId: Array<Bag>,
  distanceToRestaurant: Scalars['Float'],
  userLocation: LatLng,
  couriers: Array<Courier>,
  courierById: Courier,
  clients: Array<Client>,
  clientById: Client,
  informationPages: Array<InformationPage>,
  informationPageById: InformationPage,
  informationPageByKey: InformationPage,
  transactions: Array<Transaction>,
};


export type QueryRestaurantByIdArgs = {
  restaurantId: Scalars['ID']
};


export type QueryOrderByIdArgs = {
  id: Scalars['ID']
};


export type QueryOrderStateArgs = {
  id: Scalars['ID']
};


export type QueryOrdersForWashArgs = {
  type: WashingOrdersType
};


export type QueryBagByCodeArgs = {
  code: Scalars['String']
};


export type QueryBagsByOrderIdArgs = {
  id: Scalars['String']
};


export type QueryDistanceToRestaurantArgs = {
  latLng: LatLngInput,
  restaurantId: Scalars['String']
};


export type QueryUserLocationArgs = {
  id: Scalars['String']
};


export type QueryCourierByIdArgs = {
  courierId: Scalars['ID']
};


export type QueryClientByIdArgs = {
  clientId: Scalars['ID']
};


export type QueryInformationPageByIdArgs = {
  informationPageId: Scalars['ID']
};


export type QueryCuisineByIdArgs = {
  id: Scalars['String']
};


export type QueryDishByIdArgs = {
  id: Scalars['String']
};


export type QuerySetByIdArgs = {
  id: Scalars['String']
};

export type RequestedPayment = {
   __typename?: 'RequestedPayment',
  orderId: Scalars['String'],
  redirectUrl?: Maybe<Scalars['String']>,
  status: Scalars['Float'],
};

export type Transaction = {
   __typename?: 'Transaction',
  id: Scalars['String'],
  created: Scalars['DateTime'],
  transaction: Scalars['String'],
  quantity: Scalars['Float'],
  amountTotal: Scalars['Float'],
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
  birthday: Scalars['DateTime'],
  image: Scalars['String'],
  latLng?: Maybe<LatLng>,
  additionalUserInfo?: Maybe<AdditionalUserInfo>,
};

export type UserUpdateRequest = {
  name: Scalars['String'],
  birthday: Scalars['DateTime'],
  email: Scalars['String'],
  phoneNumber: Scalars['String'],
};

export type WashingInfo = {
   __typename?: 'WashingInfo',
  weight: Scalars['Float'],
  price: Scalars['Int'],
  washingFinish: Scalars['DateTime'],
};

export enum WashingOrdersType {
  New = 'New',
  InProgress = 'InProgress',
  Finished = 'Finished'
}

export type WorkHours = {
  opening: Scalars['DateTime'],
  closing: Scalars['DateTime'],
};
