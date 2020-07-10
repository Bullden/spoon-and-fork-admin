import GraphqlApiBase from '@spryrocks/react-api/graphql/ApiBase';
import {
  orderByIdQuery,
  ordersQuery,
  clientByIdQuery,
  clientsQuery,
  courierByIdQuery,
  couriersQuery,
  restaurantsQuery,
  restaurantByIdQuery,
  informationPagesQuery,
  informationPageByIdQuery,
  documentsQuery,
  evaluateDocumentsRevisionMutation,
  mutationUpdateMyAccountImage,
  mutationCreateOrUpdateInformationPage,
  mutationUpdateClientInformation,
  mutationUpdateRestaurantInformation,
  myAccountQuery,
  deleteOrderMutation,
  removeTheCurrentCourierMutation,
} from './SpoonAndForkGraphqlQueryBuilder';
import {ID} from 'entities/Common';
import {
  EvaluateDocumentsRevisionType,
  MutationCreateOrUpdateInformationPageArgs,
  MutationUpdateClientInformationArgs,
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

  public mutationCreateOrUpdateInformationPage(
    request: MutationCreateOrUpdateInformationPageArgs,
  ) {
    return this.mutation(mutationCreateOrUpdateInformationPage(request));
  }

  public mutationUpdateClientInformation(request: MutationUpdateClientInformationArgs) {
    return this.mutation(mutationUpdateClientInformation(request));
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

  public async queryInformationPages() {
    return this.query(informationPagesQuery());
  }

  public async queryInformationPageById(informationPageId: string) {
    return this.query(informationPageByIdQuery({informationPageId}));
  }

  public async evaluateDocumentsRevision(
    courierId: ID,
    type: EvaluateDocumentsRevisionType,
    comment: string,
  ) {
    return this.mutation(evaluateDocumentsRevisionMutation({courierId, type, comment}));
  }

  public async queryDocuments(revisionId: ID) {
    return this.query(documentsQuery({revisionId}));
  }

  public async queryDeleteOrder(orderId: string) {
    await this.mutation(deleteOrderMutation({orderId}));
  }

  public async removeTheCurrentCourier(orderId: string) {
    await this.mutation(removeTheCurrentCourierMutation({orderId}));
  }
}
