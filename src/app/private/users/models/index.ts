export type componentTypes = 'ADD' | 'EDIT';

export interface IAddUserRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role_id: number;
}

export interface IAddUserResponse {
  user_id: string;
}
