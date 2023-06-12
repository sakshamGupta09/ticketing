import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../../../core/models/user';
import USER_TABLE_COLUMNS from '../../constants/users-table-columns';
import { ROLES_MAP } from '../../../../core/models/roles';
import { componentTypes } from '../../models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public users: IUser[] = [];

  public isLoading = false;

  public columns: string[] = USER_TABLE_COLUMNS;

  readonly rolesMapping = ROLES_MAP;

  public isDrawerVisible = false;

  public drawerVisibilityBooleans: Record<componentTypes, boolean> = {
    ADD: false,
    EDIT: false,
  };

  public selectedUserForEdit: IUser = {} as IUser;

  constructor(private service: UsersService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void {
    this.isLoading = true;
    this.service.getUsers().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.users = response.data.users;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  public refreshUsersAndCloseDrawer(event: componentTypes): void {
    this.getUsers();
    this.closeClickHandler(event);
  }

  public addClickHandler(): void {
    this.isDrawerVisible = true;
    this.drawerVisibilityBooleans.ADD = true;
  }

  public editClickHandler(row: IUser): void {
    this.selectedUserForEdit = { ...row };
    this.isDrawerVisible = true;
    this.drawerVisibilityBooleans.EDIT = true;
  }

  public closeClickHandler(type: componentTypes): void {
    this.drawerVisibilityBooleans[type] = false;
    this.isDrawerVisible = false;
  }
}
