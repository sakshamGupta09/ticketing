import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IHttpResponse } from 'src/app/core/models/api-response';
import { IUser } from 'src/app/core/models/user';
import { IAddUserRequest, IAddUserResponse, IGetUsersRequest } from '../models';
import { Observable, catchError, map, of } from 'rxjs';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient) {}

  public getUsers(payload: IGetUsersRequest) {
    return this.http.get<
      IHttpResponse<{ users: IUser[]; totalRecords: number }>
    >('/user/list', { params: payload as any });
  }

  public addUser(payload: IAddUserRequest) {
    return this.http.post<IHttpResponse<IAddUserResponse>>('/user/add', {
      user: payload,
    });
  }

  public updateUser(userId: number, payload: IAddUserRequest) {
    return this.http.put<IHttpResponse<IAddUserResponse>>(
      `/user/update/${userId}`,
      {
        user: payload,
      }
    );
  }

  public deleteUser(userId: number) {
    return this.http.delete<IHttpResponse<object>>(`/user/delete/${userId}`);
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
