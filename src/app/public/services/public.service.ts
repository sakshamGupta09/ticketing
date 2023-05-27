import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHttpResponse } from 'src/app/core/models/api-response';
import { ILoginResponse } from '../models';
import { environment } from '../../../environments/environment.development';
import { catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PublicService {
  constructor(private http: HttpClient) {}

  public login(payload: { email: string; password: string }) {
    return this.http
      .post<IHttpResponse<ILoginResponse>>(
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

  public changePassword(newPassword: string) {
    return this.http.post(`${environment.API_BASE_URL}/auth/login`, {});
  }
}
