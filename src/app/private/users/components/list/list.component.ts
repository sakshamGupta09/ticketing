import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(private service: UsersService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers(): void {
    this.service.getUsers().subscribe({
      next: (response) => {},
    });
  }
}
