import {useDispatch} from 'react-redux';
import {actions as authActions} from '../ducks/auth';
import {actions as routerActions} from '../ducks/router';
import {actions as sessionActions} from '../ducks/session';
import RegisterRequest from 'auth/RegisterRequest';
import LoginRequest from 'api/entities/LoginRequest';
import UpdateUserRequest from 'state/ducks/session/models';
import ForgotPasswordRequest from 'api/entities/ForgotPasswordRequest';
import {snackBarActions} from 'state/ducks/snackBar';
import {useHistory} from 'react-router-dom';
import {orderActions} from '../ducks/order';
import {clientActions} from '../ducks/client';
import {courierActions} from '../ducks/courier';
import {restaurantActions} from '../ducks/restaurant';
import {informationPageActions} from '../ducks/informationPage';
import {orderDetailsActions} from '../ducks/orderDetails';
import {clientDetailsActions} from '../ducks/clientDetails';
import {courierDetailsActions} from '../ducks/courierDetails';
import {restaurantDetailsActions} from '../ducks/restaurantDetails';
import {informationPageDetailsActions} from '../ducks/informationPageDetails';
import CreateOrUpdateInformationPageRequest from 'api/entities/CreateOrUpdateInformationPageRequest';
import UpdateUserInformationRequest from 'api/entities/UpdateUserInformationRequest';
import UpdateRestaurantInformationRequest from 'api/entities/UpdateRestaurantInformationRequest';

export function useAuthActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    registerUser: (registerRequest: RegisterRequest) => {
      dispatch(authActions.registerUser({request: registerRequest, history}));
    },
    login: (loginRequest: LoginRequest) => {
      return dispatch(authActions.login({request: loginRequest, history}));
    },
    updateUserProfile: (updateRequest: UpdateUserRequest) => {
      dispatch(sessionActions.updateUserProfile(updateRequest));
    },
    logout: () => dispatch(authActions.logout({history})),
    recoverPassword: (email: ForgotPasswordRequest) => {
      dispatch(authActions.recoverPassword({request: email, history}));
    },
    updateProfileImage: (imageId: string) =>
      dispatch(sessionActions.updateProfileImage(imageId)),
    chooseAvatar: () => dispatch(authActions.chooseAvatar()),
  };
}

export function useOrderActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchOrders: () => dispatch(orderActions.fetchOrders()),
    selectOrder: (id: string) => {
      dispatch(routerActions.navigateToOrderDetails({history, id}));
    },
  };
}

export function useOrderDetailsActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchOrderDetails: (id: string) => dispatch(orderDetailsActions.fetchDetails(id)),
    leaveCourier: (orderId: string) =>
      dispatch(orderDetailsActions.leaveCourier(orderId)),
    closeOrder: (orderId: string) =>
      dispatch(orderDetailsActions.closeOrder({orderId, history})),
  };
}

export function useClientActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchClients: () => dispatch(clientActions.fetchClients()),
    selectClient: (id: string) => {
      dispatch(routerActions.navigateToClientDetails({history, clientId: id}));
    },
  };
}

export function useClientDetailsActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchClientDetails: (clientId: string) => {
      dispatch(clientDetailsActions.fetchDetails(clientId));
    },
    updateClientInformation: (
      updateClientInformationRequest: UpdateUserInformationRequest,
    ) => {
      dispatch(
        clientDetailsActions.updateClientInformationRequest({
          request: updateClientInformationRequest,
          history,
        }),
      );
    },
  };
}

export function useCourierActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchCouriers: () => dispatch(courierActions.fetchCouriers()),
    selectCourier: (id: string) => {
      dispatch(routerActions.navigateToCourierDetails({history, courierId: id}));
    },
  };
}

export function useCourierDetailsActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchCourierDetails: (courierId: string) => {
      dispatch(courierDetailsActions.fetchDetails(courierId));
    },
    updateCourierInformation: (
      updateCourierInformationRequest: UpdateUserInformationRequest,
    ) => {
      dispatch(
        courierDetailsActions.updateCourierInformationRequest({
          request: updateCourierInformationRequest,
          history,
        }),
      );
    },
  };
}

export function useRestaurantActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchRestaurants: () => dispatch(restaurantActions.fetchRestaurants()),
    selectRestaurant: (id: string) => {
      dispatch(routerActions.navigateToRestaurantDetails({history, restaurantId: id}));
    },
  };
}

export function useRestaurantDetailsActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchRestaurantDetails: (restaurantId: string) => {
      dispatch(restaurantDetailsActions.fetchDetails(restaurantId));
    },
    updateRestaurantInformation: (
      updateRestaurantInformationRequest: UpdateRestaurantInformationRequest,
    ) => {
      dispatch(
        restaurantDetailsActions.updateRestaurantInformationRequest({
          request: updateRestaurantInformationRequest,
          history,
        }),
      );
    },
  };
}

export function useInformationPageActions() {
  const dispatch = useDispatch();

  return {
    fetchInformationPages: () => dispatch(informationPageActions.fetchInformationPages()),
  };
}

export function useInformationPageDetailsActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchInformationPageDetails: (informationPageKey: string) => {
      dispatch(informationPageDetailsActions.fetchDetails(informationPageKey));
    },
    createOrUpdateInformationPage: (
      createOrUpdateInformationPageRequest: CreateOrUpdateInformationPageRequest,
    ) => {
      dispatch(
        informationPageDetailsActions.createOrUpdateInformationPageRequest({
          request: createOrUpdateInformationPageRequest,
          history,
        }),
      );
    },
  };
}

export function useSnackBarActions() {
  const dispatch = useDispatch();
  return {
    closeSnackBar: () => dispatch(snackBarActions.clearSnackbar()),
  };
}
