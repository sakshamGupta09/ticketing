import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { loggedInGuard } from '../core/guards/logged-in.guard';

import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordEmailSentComponent } from './components/forgot-password-email-sent/forgot-password-email-sent.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'reset-password/:authToken',
    component: ResetPasswordComponent,
  },
  {
    path: 'email-sent',
    component: ForgotPasswordEmailSentComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
