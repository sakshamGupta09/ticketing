import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            if (event.ok && request.method !== 'GET') {
              // success
            }
          }
          return event;
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            // error
          }
          return throwError(error);
        },
      })
    );
  }
}
