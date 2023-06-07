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

  public isLoading: boolean = false;

  public columns: string[] = USER_TABLE_COLUMNS;

  readonly rolesMapping = ROLES_MAP;

  public idDrawerVisible: boolean = false;

  public drawerVisibilityBooleans: Record<componentTypes, boolean> = {
    ADD: false,
    EDIT: false,
  };

  constructor(private service: UsersService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.isLoading = true;
    this.service.getUsers().subscribe({
      next: (response) => {
        this.isLoading = false;
        this.users = response.data.users;
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }

  public addClickHandler(): void {
    this.idDrawerVisible = true;
    this.drawerVisibilityBooleans.ADD = true;
  }

  public closeClickHandler(type: componentTypes): void {
    this.drawerVisibilityBooleans[type] = false;
    this.idDrawerVisible = false;
  }
}
