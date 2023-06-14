import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../../../core/models/user';
import USER_TABLE_COLUMNS from '../../constants/users-table-columns';
import { ROLES_MAP } from '../../../../core/models/roles';
import { IGetUsersRequest, componentTypes } from '../../models';
import { IPaginationParams } from 'src/app/core/models/pagination';
import { DEFAULT_PAGINATION_OPTIONS } from 'src/app/core/constants/pagination';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public users: IUser[] = [];

  public columns: string[] = USER_TABLE_COLUMNS;

  readonly rolesMapping = ROLES_MAP;

  public selectedUserForEdit: IUser = {} as IUser;

  public isDrawerVisible = false;

  public isLoading = false;

  public drawerVisibilityBooleans: Record<componentTypes, boolean> = {
    ADD: false,
    EDIT: false,
  };

  public paginationParams: IPaginationParams = {} as IPaginationParams;

  readonly pageSizeOptions = DEFAULT_PAGINATION_OPTIONS.PAGE_SIZE_OPTIONS;

  constructor(private service: UsersService) {
    this.initPaginationParams();
  }

  ngOnInit(): void {
    this.getUsers();
  }

  private initPaginationParams(): void {
    this.paginationParams = {
      limit: DEFAULT_PAGINATION_OPTIONS.LIMIT,
      offset: DEFAULT_PAGINATION_OPTIONS.OFFSET,
      totalRecords: 0,
    };
  }

  public getUsers(): void {
    this.isLoading = true;
    const payload = this.getPayload();
    this.service.getUsers(payload).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.users = response.data.users;
        this.paginationParams.totalRecords = response.data.totalRecords;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  private getPayload(): IGetUsersRequest {
    return {
      limit: this.paginationParams.limit,
      offset: this.paginationParams.offset,
    };
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
