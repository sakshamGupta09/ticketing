import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, throwError, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '@shared/services/snackbar.service';

@Injectable({ providedIn: 'root' })
export class httpInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private snackbar: SnackbarService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authToken = this.authService.getLoginData()?.authToken;

    let authReq;

    if (authToken) {
      // Add authorization
      authReq = request.clone({
        setHeaders: { Authorization: authToken },
        url: environment.API_BASE_URL + request.url,
      });
    } else {
      authReq = request;
    }

    // Handle response

    if (!authToken) {
      return next.handle(authReq);
    }

    return next.handle(authReq).pipe(
      map((event) => {
        if (event instanceof HttpResponse) {
          if (request.method !== 'GET') {
            this.snackbar.success(event.body.message);
          }
        }
        return event;
      }),
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          this.snackbar.error(error.error.message);
          if (error.status === 401) {
            this.handle401();
          }
        }
        return throwError(() => error.error);
      })
    );
  }

  private handle401(): void {
    this.authService.logoutUser();
  }
}
