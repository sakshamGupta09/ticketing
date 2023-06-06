import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../../../core/models/user';
import USER_TABLE_COLUMNS from '../../constants/users-table-columns';
import { ROLES_MAP } from '../../../../core/models/roles';
import { ActivatedRoute, Router } from '@angular/router';

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

  public isDrawerVisible: boolean = false;

  constructor(
    private service: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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
    this.isDrawerVisible = true;
    this.router.navigate(['./add'], { relativeTo: this.route });
  }
}
