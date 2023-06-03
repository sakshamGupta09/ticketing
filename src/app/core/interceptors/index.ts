import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { httpInterceptor } from './http.interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: httpInterceptor, multi: true },
];
