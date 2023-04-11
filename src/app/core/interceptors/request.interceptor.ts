import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = '';

    const authReq = request.clone({
      setHeaders: { Authorization: authToken },
      url: environment.API_URL + request.url,
    });

    return next.handle(authReq);
  }
}