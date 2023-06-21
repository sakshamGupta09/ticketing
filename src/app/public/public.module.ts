import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '../shared/icons/icons.module';
import { AlertModule } from '../shared/alert/alert.module';
import { LogoModule } from '@shared/logo/logo.module';
import { PublicRoutingModule } from './public-routing.module';

import { LoginComponent } from './pages/login/login.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ForgotPasswordEmailSentComponent } from './pages/forgot-password-email-sent/forgot-password-email-sent.component';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ForgotPasswordEmailSentComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule,
    AlertModule,
    LogoModule,
  ],
})
export class PublicModule {}
