import { Injectable } from '@angular/core';
import { ILoginData } from '../models/login-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginData: ILoginData | null = null;

  readonly localStorageKey = 'authData';

  constructor(private router: Router) {
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

  public logoutUser(): void {
    const redirectUrl = this.router.url;
    this.loginData = null;
    localStorage.removeItem(this.localStorageKey);
    this.router.navigateByUrl(`/auth/login?redirectUrl=${redirectUrl}`);
  }
}
