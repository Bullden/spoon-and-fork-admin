import {Address} from '../api/graphql/types';

export default interface Laundry {
  id: string;
  title: string;
  image: string;
  additionalInfo: string;
  contactPerson: string;
  website: string;
  address: Address;
  beginningOfWorkingDay: Date;
  endOfWorkingDay: Date;
  phoneNumber: string;
  services: string;
}
