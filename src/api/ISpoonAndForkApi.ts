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
import {DocumentsGroups, EvaluateDocumentsRevisionType} from 'entities/Documents';
import UpdateFirebaseTokenRequest from 'api/entities/UpdateFirebaseTokenRequest';
import CreateOrUpdateInformationPageRequest from 'api/entities/CreateOrUpdateInformationPageRequest';
import UpdateClientInformationRequest from 'api/entities/UpdateClientInformationRequest';
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
  updateClientInformationRequest(request: UpdateClientInformationRequest): Promise<void>;

  getCouriers(): Promise<Courier[]>;
  getCourierById(id: ID): Promise<Courier>;

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

  evaluateDocumentsRevision(
    revisionId: ID,
    type: EvaluateDocumentsRevisionType,
    comment: string,
  ): Promise<void>;

  getDocuments(revisionId: ID): Promise<DocumentsGroups>;

  updateFirebaseToken(request: UpdateFirebaseTokenRequest): Promise<void>;

  removeTheCurrentCourier(courierId: ID): Promise<void>;

  deleteOrder(orderId: ID): Promise<void>;
}
