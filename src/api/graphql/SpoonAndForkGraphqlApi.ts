import GraphqlApiBase from '@spryrocks/react-api/graphql/ApiBase';
import {
  clientByIdQuery,
  clientsQuery,
  courierByIdQuery,
  couriersQuery,
  cuisineByIdQuery,
  cuisinesQuery,
  deleteOrderMutation,
  mutationUpdateClientInformation,
  mutationUpdateCourierInformation,
  mutationUpdateCuisine,
  mutationUpdateMyAccountImage,
  mutationUpdateRestaurantInformation,
  myAccountQuery,
  orderByIdQuery,
  ordersQuery,
  removeTheCurrentCourierMutation,
  restaurantByIdQuery,
  restaurantsQuery,
} from './SpoonAndForkGraphqlQueryBuilder';
import {ID} from 'entities/Common';
import {
  MutationUpdateClientInformationArgs,
  MutationUpdateCourierInformationArgs,
  MutationUpdateCuisineArgs,
  MutationUpdateRestaurantInformationArgs,
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

  public async queryDeleteOrder(orderId: string) {
    await this.mutation(deleteOrderMutation({orderId}));
  }

  public async removeTheCurrentCourier(orderId: string) {
    await this.mutation(removeTheCurrentCourierMutation({orderId}));
  }
}
