import {ISpoonAndForkApi} from 'api/ISpoonAndForkApi';
import RegisterRequest from './entities/RegisterRequest';
import LoginRequest from './entities/LoginRequest';
import RestApi from 'api/rest/RestApi';
import ApiConfiguration from '@spryrocks/react-api/ApiConfiguration';
import SpoonAndForkGraphqlApi from 'api/graphql/SpoonAndForkGraphqlApi';
import {
  groupDocumentFromGQL,
  mapOrderFromGQL,
  mapOrdersFromGQL,
  mapClientFromGQL,
  mapClientsFromGQL,
  mapCourierFromGQL,
  mapCouriersFromGQL,
  mapRestaurantFromGQL,
  mapRestaurantsFromGQL,
  mapMyAccountFromGQL,
  mapInformationPagesFromGQL,
  mapInformationPageFromGQL,
  mapCreateOrUpdateInformationPageRequestToGQL,
  mapUpdateClientInformationRequestToGQL,
} from 'api/Mappers';
// import {ApolloError} from 'apollo-boost';
// import * as R from 'ramda';
import ForgotPasswordRequest from 'api/entities/ForgotPasswordRequest';
// import Queue from 'promise-queue';
// import {AuthInfoKeeper} from 'auth';
// import {SpoonAndForkApiTokenHolders} from 'api/index';
import ApiDelegate, {AuthInfo} from '@spryrocks/react-api/ApiDelegate';
import ApiBase from '@spryrocks/react-api/ApiBase';
import IApiTokenHolder from '@spryrocks/react-api/IApiTokenHolder';
import {ID} from 'entities/Common';
import {EvaluateDocumentsRevisionType} from 'entities/Documents';
import UpdateFirebaseTokenRequest from 'api/entities/UpdateFirebaseTokenRequest';
import CreateOrUpdateInformationPageRequest from 'api/entities/CreateOrUpdateInformationPageRequest';
import InformationPage from 'entities/InformationPage';
import UpdateClientInformationRequest from 'api/entities/UpdateClientInformationRequest';
import UpdateRestaurantInformationRequest from './entities/UpdateRestaurantInformationRequest';

export default class SpoonAndForkApi extends ApiBase implements ISpoonAndForkApi {
  // private refreshQueue = new Queue(1, Infinity);

  private readonly restApi: RestApi;

  private readonly graphqlApi: SpoonAndForkGraphqlApi;

  constructor(
    configuration: ApiConfiguration,
    delegate: ApiDelegate,
    tokenHolder: IApiTokenHolder,
  ) {
    super(configuration, delegate, tokenHolder);

    this.graphqlApi = new SpoonAndForkGraphqlApi(
      this.baseUrl,
      this.wsBaseUrl,
      configuration.graphql,
      this.delegate,
    );
    this.restApi = new RestApi(this.baseUrl, configuration.rest, this.delegate);
  }

  public async register(request: RegisterRequest) {
    return this.restApi.register(request);
  }

  public async login(request: LoginRequest) {
    return this.restApi.login(request);
  }

  public async uploadFile(uri: string) {
    return this.restApi.uploadFile(uri);
  }

  public async myAccount() {
    return this.wrapApiCall(async () =>
      mapMyAccountFromGQL(await this.graphqlApi.queryMyAccount()),
    );
  }

  // public async wrapApiCall<TResponse>(
  //   call: () => Promise<TResponse>,
  // ): Promise<TResponse> {
  //   try {
  //     return await call();
  //   } catch (e) {
  //     if (SpoonAndForkApi.checkNotAuthorizedError(e)) {
  //       await this.refreshQueue.add(() => this.refreshTokens());
  //       // eslint-disable-next-line no-return-await
  //       return await call();
  //     }
  //     throw e;
  //   }
  // }
  //
  // private static checkNotAuthorizedError(e: ApolloError | ApiHttpError) {
  //   if (e instanceof ApiError) {
  //     return e.status === 401;
  //   }
  //   // @ts-ignore
  //   const gqlError = R.filter((e) => e.message.statusCode === 401, e.graphQLErrors);
  //   return !!gqlError;
  // }

  protected async refreshToken(refreshToken: string): Promise<AuthInfo> {
    const session = await this.restApi.refresh({refreshToken});
    return {accessToken: session.jwt, refreshToken: session.refreshToken};
  }

  public async forgotPassword(request: ForgotPasswordRequest) {
    return this.restApi.forgotPassword(request);
  }

  public async updateUserPassword(oldPassword: string, password: string) {
    return this.wrapApiCall(async () =>
      this.restApi.changePassword({oldPassword, password}),
    );
  }

  public async updateUserProfileImage(imageId: string): Promise<void> {
    return this.wrapApiCall(async () =>
      this.graphqlApi.mutationUpdateMyAccountImage(imageId),
    );
  }

  public async getOrders() {
    return this.wrapApiCall(async () =>
      mapOrdersFromGQL(this.configuration, await this.graphqlApi.queryOrders()),
    );
  }

  public async getOrderById(id: ID) {
    return this.wrapApiCall(async () =>
      mapOrderFromGQL(this.configuration, await this.graphqlApi.queryOrderById(id)),
    );
  }

  public async getClients() {
    return this.wrapApiCall(async () =>
      mapClientsFromGQL(this.configuration, await this.graphqlApi.queryClients()),
    );
  }

  public async getClientById(id: ID) {
    return this.wrapApiCall(async () =>
      mapClientFromGQL(this.configuration, await this.graphqlApi.queryClientById(id)),
    );
  }

  public async updateClientInformationRequest(
    request: UpdateClientInformationRequest,
  ): Promise<void> {
    return this.wrapApiCall(async () =>
      this.graphqlApi.mutationUpdateClientInformation(
        mapUpdateClientInformationRequestToGQL(request),
      ),
    );
  }

  public async getCouriers() {
    return this.wrapApiCall(async () =>
      mapCouriersFromGQL(this.configuration, await this.graphqlApi.queryCouriers()),
    );
  }

  public async getCourierById(id: ID) {
    return this.wrapApiCall(async () =>
      mapCourierFromGQL(await this.graphqlApi.queryCourierById(id)),
    );
  }

  public async getRestaurants() {
    return this.wrapApiCall(async () =>
      mapRestaurantsFromGQL(this.configuration, await this.graphqlApi.queryRestaurants()),
    );
  }

  public async getRestaurantById(id: ID) {
    return this.wrapApiCall(async () =>
      mapRestaurantFromGQL(await this.graphqlApi.queryRestaurantById(id)),
    );
  }

  public async updateRestaurantInformationRequest(
    request: UpdateRestaurantInformationRequest,
  ): Promise<void> {
    return this.wrapApiCall(async () =>
      this.graphqlApi.mutationUpdateRestaurantInformation(request),
    );
  }

  public async getInformationPages() {
    return this.wrapApiCall(async () =>
      mapInformationPagesFromGQL(
        this.configuration,
        await this.graphqlApi.queryInformationPages(),
      ),
    );
  }

  public async getInformationPageById(id: string) {
    return this.wrapApiCall(async () =>
      mapInformationPageFromGQL(
        this.configuration,
        await this.graphqlApi.queryInformationPageById(id),
      ),
    );
  }

  public async createOrUpdateInformationPageRequest(
    request: CreateOrUpdateInformationPageRequest,
  ): Promise<InformationPage> {
    return this.wrapApiCall(async () =>
      this.graphqlApi.mutationCreateOrUpdateInformationPage(
        mapCreateOrUpdateInformationPageRequestToGQL(request),
      ),
    );
  }

  public async evaluateDocumentsRevision(
    courierId: ID,
    type: EvaluateDocumentsRevisionType,
    comment: string,
  ) {
    return this.wrapApiCall(async () =>
      this.graphqlApi.evaluateDocumentsRevision(courierId, type, comment),
    );
  }

  public async getDocuments(revisionId: ID) {
    return this.wrapApiCall(async () =>
      groupDocumentFromGQL(
        this.configuration,
        await this.graphqlApi.queryDocuments(revisionId),
      ),
    );
  }

  public async updateFirebaseToken(request: UpdateFirebaseTokenRequest) {
    return this.wrapApiCall(async () => this.restApi.updateFirebaseToken(request));
  }

  public async deleteOrder(orderId: string) {
    await this.wrapApiCall(async () => this.graphqlApi.queryDeleteOrder(orderId));
  }

  public async removeTheCurrentCourier(orderId: string) {
    await this.wrapApiCall(async () => this.graphqlApi.removeTheCurrentCourier(orderId));
  }
}
