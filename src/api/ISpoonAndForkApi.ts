import Session from '@spryrocks/react-auth/Session';
import RegisterRequest from './entities/RegisterRequest';
import LoginRequest from './entities/LoginRequest';
import {Account} from 'entities/Account';
import ForgotPasswordRequest from 'api/entities/ForgotPasswordRequest';
import Order from 'entities/Order';
import Client from 'entities/Client';
import Courier from 'entities/Courier';
import Restaurant from 'entities/Restaurant';
import Cuisine from 'entities/Cuisine';
import Dish from 'entities/Dish';
import {ID} from 'entities/Common';
import UpdateFirebaseTokenRequest from 'api/entities/UpdateFirebaseTokenRequest';
import UpdateUserInformationRequest from 'api/entities/UpdateUserInformationRequest';
import UpdateRestaurantInformationRequest from './entities/UpdateRestaurantInformationRequest';
import UpdateCuisineRequest from 'api/entities/UpdateCuisineRequest';
import CreateCuisineRequest from 'api/entities/CreateCuisineRequest';
import UpdateDishRequest from 'api/entities/UpdateDishRequest';
import CreateDishRequest from 'api/entities/CreateDishRequest';

export interface ISpoonAndForkApi {
  register(request: RegisterRequest): Promise<Session>;
  login(request: LoginRequest): Promise<Session>;
  myAccount(): Promise<Account>;
  uploadFile(file: File): Promise<void>;

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

  getCuisines(): Promise<Cuisine[]>;
  getCuisineById(id: string): Promise<Cuisine>;
  updateCuisineRequest(request: UpdateCuisineRequest): Promise<Cuisine>;
  createCuisineRequest(request: CreateCuisineRequest): Promise<void>;

  getDishes(): Promise<Dish[]>;
  getDishById(id: string): Promise<Dish>;
  updateDishRequest(request: UpdateDishRequest): Promise<Dish>;
  createDishRequest(request: CreateDishRequest): Promise<void>;

  updateFirebaseToken(request: UpdateFirebaseTokenRequest): Promise<void>;

  removeTheCurrentCourier(courierId: ID): Promise<void>;

  deleteOrder(orderId: ID): Promise<void>;
}
