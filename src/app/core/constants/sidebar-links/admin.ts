import { ISidebarLink } from '../../models/sidebar-link';

const ADMIN_SIDE_MENU_ITEMS: ISidebarLink[] = [
  { name: 'Dashboard', icon: 'home', url: 'dashboard' },
  { name: 'Users', icon: 'manage_accounts', url: 'users' },
  { name: 'Departments', icon: 'corporate_fare', url: 'departments' },
];

export default ADMIN_SIDE_MENU_ITEMS;
