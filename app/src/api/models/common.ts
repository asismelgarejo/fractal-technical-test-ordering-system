export interface HttpResponse<T> {
  data: T;
  message: string;
  status: number;
}
