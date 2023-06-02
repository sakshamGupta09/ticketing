import { render, screen, fireEvent, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { TestBed } from '@angular/core/testing';
import { createMock } from '@testing-library/angular/jest-utils';

import { TestModule } from '../../../../../tests/test.module';
import { AuthService } from '../../../../core/services/auth.service';
import { Roles } from '../../../../core/models/roles';
import { SidebarComponent } from './sidebar.component';
import ADMIN_SIDE_MENU_ITEMS from '../../../../core/constants/sidebar-links/admin';
import { Router } from '@angular/router';
import { LayoutComponent } from '../../../layout/layout.component';
import { DashboardComponent } from '../../../dashboard/components/dashboard/dashboard.component';

describe('SidebarComponent', () => {
  test("It should render menu links based on the looged in user's role", async () => {
    const authServiceMock = createMock(AuthService);
    authServiceMock.getLoginData.mockImplementation(() => ({
      role_id: Roles.ADMIN,
    }));

    await render(SidebarComponent, {
      imports: [TestModule],
      componentProviders: [{ provide: AuthService, useValue: authServiceMock }],
    });

    ADMIN_SIDE_MENU_ITEMS.forEach((menuItem) => {
      const link = screen.getByText(menuItem.name);
      expect(link).toBeInTheDocument();
    });
  });

  test('it should navigate on clicking a link', async () => {
    const authServiceMock = createMock(AuthService);
    authServiceMock.getLoginData.mockImplementation(() => ({
      role_id: Roles.ADMIN,
    }));

    await render(SidebarComponent, {
      imports: [TestModule],
      componentProviders: [{ provide: AuthService, useValue: authServiceMock }],
      routes: [
        {
          path: '',
          component: LayoutComponent,
          children: [{ path: 'dashboard', component: DashboardComponent }],
        },
      ],
    });

    const router = TestBed.inject(Router);
    jest.spyOn(router, 'navigateByUrl');

    const dashboardLink = screen.getByText(/dashboard/i);
    expect(dashboardLink).toBeInTheDocument();

    await userEvent.click(dashboardLink);

    waitFor(() => {
      expect(router.navigateByUrl).toHaveBeenCalled();
      expect(dashboardLink).toHaveClass('active');
    });
  });
});
