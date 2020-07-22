import Session from '@spryrocks/react-auth/Session';
import RegisterRequest from './entities/RegisterRequest';
import LoginRequest from './entities/LoginRequest';
import {Account} from 'entities/Account';
import ForgotPasswordRequest from 'api/entities/ForgotPasswordRequest';
import Order from 'entities/Order';
import Client from 'entities/Client';
import Courier from 'entities/Courier';
import Restaurant from 'entities/Restaurant';
import InformationPage from 'entities/InformationPage';
import {ID} from 'entities/Common';
import UpdateFirebaseTokenRequest from 'api/entities/UpdateFirebaseTokenRequest';
import CreateOrUpdateInformationPageRequest from 'api/entities/CreateOrUpdateInformationPageRequest';
import UpdateUserInformationRequest from 'api/entities/UpdateUserInformationRequest';
import UpdateRestaurantInformationRequest from './entities/UpdateRestaurantInformationRequest';

export interface ISpoonAndForkApi {
  register(request: RegisterRequest): Promise<Session>;
  login(request: LoginRequest): Promise<Session>;
  myAccount(): Promise<Account>;
  uploadFile(uri: string): Promise<void>;

  forgotPassword(request: ForgotPasswordRequest): Promise<void>;

  updateUserPassword(oldPassword: string, password: string): Promise<void>;
  updateUserProfileImage(imageId: string): Promise<void>;

  getOrders(): Promise<Order[]>;
  getOrderById(id: ID): Promise<Order>;

  getClients(): Promise<Client[]>;
  getClientById(id: ID): Promise<Client>;
  updateClientInformationRequest(request: UpdateUserInformationRequest): Promise<void>;

  getCouriers(): Promise<Courier[]>;
  getCourierById(id: ID): Promise<Courier>;
  updateCourierInformationRequest(request: UpdateUserInformationRequest): Promise<void>;

  getRestaurants(): Promise<Restaurant[]>;
  getRestaurantById(id: ID): Promise<Restaurant>;
  updateRestaurantInformationRequest(
    request: UpdateRestaurantInformationRequest,
  ): Promise<void>;

  getInformationPages(): Promise<InformationPage[]>;
  getInformationPageById(id: ID): Promise<InformationPage>;
  createOrUpdateInformationPageRequest(
    request: CreateOrUpdateInformationPageRequest,
  ): Promise<InformationPage>;

  updateFirebaseToken(request: UpdateFirebaseTokenRequest): Promise<void>;

  removeTheCurrentCourier(courierId: ID): Promise<void>;

  deleteOrder(orderId: ID): Promise<void>;
}