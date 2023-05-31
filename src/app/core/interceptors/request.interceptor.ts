import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../services/auth.service';

export class RequestInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authService = inject(AuthService);
    const authToken = authService.getLoginData()!.authToken;

    const authReq = request.clone({
      setHeaders: { Authorization: authToken },
      url: environment.API_BASE_URL + request.url,
    });

    return next.handle(authReq);
  }
}
