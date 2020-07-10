import LatLng from 'entities/LatLng';

export default interface Address {
  id: string;
  palaceId: string | undefined;
  description: string;
  latLng: LatLng;
}
