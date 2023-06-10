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

export const ALL_ROLES = [
  { id: Roles.ADMIN, label: ROLES_MAP[Roles.ADMIN] },
  { id: Roles.AGENT, label: ROLES_MAP[Roles.AGENT] },
  { id: Roles.EMPLOYEE, label: ROLES_MAP[Roles.EMPLOYEE] },
];
