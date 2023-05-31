import { Injectable } from '@angular/core';
import { ILoginData } from '../models/login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginData: ILoginData | null = null;

  readonly localStorageKey = 'authData';

  constructor() {
    this.setAuthDataFromCache();
  }

  private setAuthDataFromCache(): void {
    let authData = localStorage.getItem(this.localStorageKey);
    if (authData) {
      this.loginData = JSON.parse(authData);
    }
  }

  public getLoginData(): ILoginData | null {
    return this.loginData;
  }

  public setLoginData(authData: ILoginData): void {
    this.loginData = authData;
    localStorage.setItem(this.localStorageKey, JSON.stringify(authData));
  }
}
