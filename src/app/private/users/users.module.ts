import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './components/list/list.component';

import { UsersService } from './services/users.service';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, HttpClientModule, UsersRoutingModule],
  providers: [UsersService],
})
export class UsersModule {}
