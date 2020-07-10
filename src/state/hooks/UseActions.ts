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
import {laundryActions} from '../ducks/laundry';
import {informationPageActions} from '../ducks/informationPage';
import {orderDetailsActions} from '../ducks/orderDetails';
import {clientDetailsActions} from '../ducks/clientDetails';
import {courierDetailsActions} from '../ducks/courierDetails';
import {laundryDetailsActions} from '../ducks/laundryDetails';
import {informationPageDetailsActions} from '../ducks/informationPageDetails';
import {EvaluateDocumentsRevisionType} from 'entities/Documents';
import CreateOrUpdateInformationPageRequest from 'api/entities/CreateOrUpdateInformationPageRequest';
import UpdateClientInformationRequest from 'api/entities/UpdateClientInformationRequest';
import UpdateLaundryInformationRequest from '../../api/entities/UpdateLaundryInformationRequest';

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
      updateClientInformationRequest: UpdateClientInformationRequest,
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
  return {
    fetchCourierDetails: (courierId: string) => {
      dispatch(courierDetailsActions.fetchDetails(courierId));
    },
    evaluateDocumentsRevision: (
      courierId: string,
      type: EvaluateDocumentsRevisionType,
      comment: string,
    ) => {
      dispatch(
        courierDetailsActions.evaluateDocumentsRevision({courierId, type, comment}),
      );
    },
  };
}

export function useLaundryActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchLaundries: () => dispatch(laundryActions.fetchLaundries()),
    selectLaundry: (id: string) => {
      dispatch(routerActions.navigateToLaundryDetails({history, laundryId: id}));
    },
  };
}

export function useLaundryDetailsActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    fetchLaundryDetails: (laundryId: string) => {
      dispatch(laundryDetailsActions.fetchDetails(laundryId));
    },
    updateLaundryInformation: (
      updateLaundryInformationRequest: UpdateLaundryInformationRequest,
    ) => {
      dispatch(
        laundryDetailsActions.updateLaundryInformationRequest({
          request: updateLaundryInformationRequest,
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
