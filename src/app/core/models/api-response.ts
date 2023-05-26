export interface IHttpResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface IHttpErrorResponse {
  statusCode: number;
  message: string;
}
