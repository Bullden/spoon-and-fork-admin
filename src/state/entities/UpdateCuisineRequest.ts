export default interface UpdateCuisineRequest {
  id: string;
  uploadFile: File | string | undefined;
  nationality: string;
  count: string;
  rating: string;
}
