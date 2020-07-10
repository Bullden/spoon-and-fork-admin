import {CreateAddressRequest} from 'api/graphql/types';

export default interface CreateOrderRequest {
  bagIds: string[];
  laundryId: string;
  weight: number;
  comment: string;
  unlockCode: string;
  clientAddress: CreateAddressRequest;
}
