import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { LoaderModule } from '@shared/loader/loader.module';
import { MatButtonModule } from '@angular/material/button';
import { DrawerModule } from '@shared/drawer/drawer.module';

import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './components/list/list.component';

import { UsersService } from './services/users.service';
import { AddComponent } from './components/add/add.component';

@NgModule({
  declarations: [ListComponent, AddComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    UsersRoutingModule,
    MatTableModule,
    LoaderModule,
    MatButtonModule,
    DrawerModule,
  ],
  providers: [UsersService],
})
export class UsersModule {}
