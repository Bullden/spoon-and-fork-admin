import GraphqlApiBase from '@spryrocks/react-api/graphql/ApiBase';
import {
  clientByIdQuery,
  clientsQuery,
  courierByIdQuery,
  couriersQuery,
  cuisineByIdQuery,
  cuisinesQuery,
  dishByIdQuery,
  dishesQuery,
  deleteOrderMutation,
  mutationUpdateClientInformation,
  mutationUpdateCourierInformation,
  mutationUpdateCuisine,
  mutationCreateCuisine,
  mutationUpdateDish,
  mutationCreateDish,
  mutationUpdateSet,
  mutationCreateSet,
  mutationUpdateMyAccountImage,
  mutationUpdateRestaurantInformation,
  myAccountQuery,
  orderByIdQuery,
  ordersQuery,
  removeTheCurrentCourierMutation,
  restaurantByIdQuery,
  restaurantsQuery,
  setsQuery,
  setByIdQuery,
  statusesQuery,
  setsByDishIdQuery,
} from './SpoonAndForkGraphqlQueryBuilder';
import {ID} from 'entities/Common';
import {
  MutationCreateCuisineArgs,
  MutationCreateDishArgs,
  MutationCreateSetArgs,
  MutationUpdateClientInformationArgs,
  MutationUpdateCourierInformationArgs,
  MutationUpdateCuisineArgs,
  MutationUpdateDishArgs,
  MutationUpdateRestaurantInformationArgs,
  MutationUpdateSetArgs,
} from 'api/graphql/types';

export default class SpoonAndForkGraphqlApi extends GraphqlApiBase {
  public async queryMyAccount() {
    return this.query(myAccountQuery());
  }

  public mutationUpdateMyAccountImage(image: string) {
    return this.mutation(
      mutationUpdateMyAccountImage({
        image,
      }),
    );
  }

  public mutationUpdateCuisine(request: MutationUpdateCuisineArgs) {
    return this.mutation(mutationUpdateCuisine(request));
  }

  public mutationCreateCuisine(request: MutationCreateCuisineArgs) {
    return this.mutation(mutationCreateCuisine(request));
  }

  public mutationUpdateDish(request: MutationUpdateDishArgs) {
    return this.mutation(mutationUpdateDish(request));
  }

  public mutationCreateDish(request: MutationCreateDishArgs) {
    return this.mutation(mutationCreateDish(request));
  }

  public mutationUpdateSet(request: MutationUpdateSetArgs) {
    return this.mutation(mutationUpdateSet(request));
  }

  public mutationCreateSet(request: MutationCreateSetArgs) {
    return this.mutation(mutationCreateSet(request));
  }

  public mutationUpdateClientInformation(request: MutationUpdateClientInformationArgs) {
    return this.mutation(mutationUpdateClientInformation(request));
  }

  public mutationUpdateCourierInformation(request: MutationUpdateCourierInformationArgs) {
    return this.mutation(mutationUpdateCourierInformation(request));
  }

  public async queryOrders() {
    return this.query(ordersQuery());
  }

  public async queryOrderById(id: ID) {
    return this.query(orderByIdQuery({id}));
  }

  public async queryClients() {
    return this.query(clientsQuery());
  }

  public async queryClientById(clientId: ID) {
    return this.query(clientByIdQuery({clientId}));
  }

  public async queryCouriers() {
    return this.query(couriersQuery());
  }

  public async queryCourierById(courierId: ID) {
    return this.query(courierByIdQuery({courierId}));
  }

  public async queryRestaurants() {
    return this.query(restaurantsQuery());
  }

  public async queryRestaurantById(restaurantId: ID) {
    return this.query(restaurantByIdQuery({restaurantId}));
  }

  public mutationUpdateRestaurantInformation(
    request: MutationUpdateRestaurantInformationArgs,
  ) {
    return this.mutation(mutationUpdateRestaurantInformation(request));
  }

  public async queryCuisines() {
    return this.query(cuisinesQuery());
  }

  public async queryCuisineById(id: string) {
    return this.query(cuisineByIdQuery({id}));
  }

  public async queryDishes() {
    return this.query(dishesQuery());
  }

  public async queryDishById(id: string) {
    return this.query(dishByIdQuery({id}));
  }

  public async querySets() {
    return this.query(setsQuery());
  }

  public async querySetById(id: string) {
    return this.query(setByIdQuery({id}));
  }

  public async querySetsByDishId(id: string) {
    return this.query(setsByDishIdQuery({id}));
  }

  public async queryDeleteOrder(orderId: string) {
    await this.mutation(deleteOrderMutation({orderId}));
  }

  public async removeTheCurrentCourier(orderId: string) {
    await this.mutation(removeTheCurrentCourierMutation({orderId}));
  }

  public async queryStatuses() {
    return this.query(statusesQuery());
  }
}
