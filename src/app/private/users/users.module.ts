import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { LoaderModule } from '@shared/loader/loader.module';
import { MatButtonModule } from '@angular/material/button';
import { DrawerModule } from '@shared/drawer/drawer.module';
import { DialogModule } from '@shared/dialog/dialog.module';
import { IconsModule } from '@shared/icons/icons.module';
import {
  MAT_PAGINATOR_DEFAULT_OPTIONS,
  MatPaginatorModule,
} from '@angular/material/paginator';

import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './pages/list/list.component';

import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { DeleteComponent } from './components/delete/delete.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FiltersFormComponent } from './components/filters-form/filters-form.component';

@NgModule({
  declarations: [ListComponent, AddComponent, EditComponent, DeleteComponent, SearchBarComponent, FiltersFormComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTableModule,
    LoaderModule,
    MatButtonModule,
    IconsModule,
    DrawerModule,
    DialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
  ],
  providers: [
    {
      provide: MAT_PAGINATOR_DEFAULT_OPTIONS,
      useValue: { formFieldAppearance: 'fill' },
    },
  ],
})
export class UsersModule {}
