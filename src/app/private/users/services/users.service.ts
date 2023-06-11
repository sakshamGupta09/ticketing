import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IHttpResponse } from 'src/app/core/models/api-response';
import { IUser } from 'src/app/core/models/user';
import { IAddUserRequest, IAddUserResponse } from '../models';

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
}
