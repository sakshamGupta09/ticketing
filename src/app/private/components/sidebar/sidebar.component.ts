import { Component, OnInit } from '@angular/core';
import { ILoginData } from '../../../core/models/login-response';
import { ISidebarLink } from '../../../core/models/sidebar-link';
import { AuthService } from '../../../core/services/auth.service';
import SIDEBAR_LINKS_BY_ROLE from '../../../core/utils/sidebar-role-mapping';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public menuItems: ISidebarLink[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const authData = this.authService.getLoginData();
    authData && this.setMenuItems(authData);
  }

  private setMenuItems(authData: ILoginData): void {
    const userRoleId = authData.role_id;
    this.menuItems = SIDEBAR_LINKS_BY_ROLE[userRoleId];
  }

  public trackByFn(index: number, item: ISidebarLink): number {
    return index;
  }
}
