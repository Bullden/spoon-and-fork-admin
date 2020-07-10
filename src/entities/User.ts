import AdditionalUserInfo from './AdditionalUserInfo';
import LatLng from './LatLng';

export default interface User {
  id: string;
  name: string;
  birthday: Date;
  image: string;
  latLng?: LatLng;
  additionalUserInfo?: AdditionalUserInfo;
}
