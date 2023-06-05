import { IUser } from '../../app/core/models/user';

const USERS_MOCK: IUser[] = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@gmail.com',
    phone: '7889989888',
    role_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    first_name: 'Drake',
    last_name: 'Bottom',
    email: 'drake@gmail.com',
    phone: '8776676123',
    role_id: 2,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

export default USERS_MOCK;
