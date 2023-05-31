import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHttpResponse } from 'src/app/core/models/api-response';
import { environment } from '../../../environments/environment.development';
import { catchError, throwError } from 'rxjs';
import { ILoginData } from '../../core/models/login-response';

@Injectable({ providedIn: 'root' })
export class PublicService {
  constructor(private http: HttpClient) {}

  public login(payload: { email: string; password: string }) {
    return this.http
      .post<IHttpResponse<ILoginData>>(
        `${environment.API_BASE_URL}/auth/login`,
        payload
      )
      .pipe(
        catchError((error: HttpErrorResponse) => throwError(() => error.error))
      );
  }

  public sendResetPasswordMail(email: string) {
    return this.http
      .post<IHttpResponse<{}>>(
        `${environment.API_BASE_URL}/auth/forgotPassword`,
        {
          email,
        }
      )
      .pipe(
        catchError((error: HttpErrorResponse) => throwError(() => error.error))
      );
  }

  public changePassword(authToken: string, newPassword: string) {
    return this.http
      .post<IHttpResponse<{}>>(
        `${environment.API_BASE_URL}/auth/resetPassword`,
        {
          token: authToken,
          password: newPassword,
        }
      )
      .pipe(
        catchError((error: HttpErrorResponse) => throwError(() => error.error))
      );
  }
}
