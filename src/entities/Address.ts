import LatLng from 'entities/LatLng';

export default interface Address {
  id: string;
  placeId?: string | undefined;
  description: string;
  latLng: LatLng;
}
