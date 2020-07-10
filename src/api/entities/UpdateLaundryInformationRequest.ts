export default interface UpdateLaundryInformationRequest {
  id: string;
  title: string;
  additionalInfo: string;
  contactPerson: string;
  website: string;
  addressDescription: string;
  lat: number;
  lng: number;
  beginningOfWorkingDay: Date;
  endOfWorkingDay: Date;
  phoneNumber: string;
  services: string;
}
