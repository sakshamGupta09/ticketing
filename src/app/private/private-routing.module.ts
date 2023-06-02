import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from '../core/guards/auth.guard';
import checkRoleAccess from '../core/guards/role.guard';
import { Roles } from '../core/models/roles';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [
          checkRoleAccess([Roles.ADMIN, Roles.AGENT, Roles.CUSTOMER]),
        ],
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'users',
        canActivate: [checkRoleAccess([Roles.ADMIN])],
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
