import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import IApiResponse from '../../core/models/api-response';

@Injectable({ providedIn: 'root' })
export class PublicService {
  constructor(private http: HttpClient) {}

  public login(payload: any) {
    return of({});
  }

  public sendResetPasswordMail(email: string) {
    return of({});
  }
}
