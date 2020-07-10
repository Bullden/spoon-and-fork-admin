import Address from 'entities/Address';

export default interface Restaurant {
  id: string;
  userId: string;
  imageId: string;
  description: string;
  address: Address;
}
