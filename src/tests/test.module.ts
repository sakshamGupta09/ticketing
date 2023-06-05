import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '@shared/icons/icons.module';
import { AlertModule } from '@shared/alert/alert.module';
import { LogoModule } from '@shared/logo/logo.module';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientTestingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    IconsModule,
    AlertModule,
    LogoModule,
    FormsModule,
    ReactiveFormsModule,
    RouterTestingModule,
    MatTableModule,
  ],
  exports: [
    CommonModule,
    HttpClientTestingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    IconsModule,
    AlertModule,
    LogoModule,
    FormsModule,
    ReactiveFormsModule,
    RouterTestingModule,
    MatTableModule,
  ],
})
export class TestModule {}
