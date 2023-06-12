import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IHttpResponse } from 'src/app/core/models/api-response';
import { IUser } from 'src/app/core/models/user';
import { IAddUserRequest, IAddUserResponse } from '../models';
import { Observable, catchError, map, of } from 'rxjs';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient) {}

  public getUsers() {
    return this.http.get<IHttpResponse<{ users: IUser[] }>>('/user/list');
  }

  public addUser(payload: IAddUserRequest) {
    return this.http.post<IHttpResponse<IAddUserResponse>>('/user/add', {
      user: payload,
    });
  }

  public checkUserExists(controlType: 'email' | 'phone', controlValue: string) {
    return this.http
      .get<IHttpResponse<{ exists: boolean }>>('/user/exists', {
        params: {
          entityName: controlType,
          entityValue: controlValue,
        },
      })
      .pipe(map((response) => response.data.exists));
  }

  public userExistsValidator(
    controlType: 'email' | 'phone',
    previousControlValue: string = ''
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (previousControlValue && control.value === previousControlValue) {
        return of(null);
      }
      return this.checkUserExists(controlType, control.value).pipe(
        map((isTaken) => (isTaken ? { isTaken: true } : null)),
        catchError(() => of(null))
      );
    };
  }
}
