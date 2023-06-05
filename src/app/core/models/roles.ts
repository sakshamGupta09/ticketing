export enum Roles {
  ADMIN = 1,
  AGENT = 2,
  EMPLOYEE = 3,
}

export const ROLES_MAP: Record<number, string> = {
  1: 'Admin',
  2: 'Agent',
  3: 'Employee',
};
