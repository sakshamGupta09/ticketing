import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { LoaderModule } from '@shared/loader/loader.module';
import { MatButtonModule } from '@angular/material/button';
import { DrawerModule } from '@shared/drawer/drawer.module';
import { IconsModule } from '@shared/icons/icons.module';

import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './components/list/list.component';

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
    IconsModule,
    DrawerModule,
  ],
})
export class UsersModule {}
