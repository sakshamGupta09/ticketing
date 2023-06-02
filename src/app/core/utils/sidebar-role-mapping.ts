import { ISidebarLink } from '../models/sidebar-link';
import { Roles } from '../models/roles';
import ADMIN_SIDE_MENU_ITEMS from '../constants/sidebar-links/admin';

const SIDEBAR_LINKS_BY_ROLE: Record<number, ISidebarLink[]> = {
  [Roles.ADMIN]: ADMIN_SIDE_MENU_ITEMS,
};

export default SIDEBAR_LINKS_BY_ROLE;
