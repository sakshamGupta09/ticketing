import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PublicService {
  constructor(private http: HttpClient) {}

  public login(payload: unknown) {
    return of(payload);
  }

  public sendResetPasswordMail(email: string) {
    return of(email);
  }
}
