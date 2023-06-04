import { render, screen, fireEvent, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { TestBed } from '@angular/core/testing';
import { createMock } from '@testing-library/angular/jest-utils';

import { TestModule } from '../../../../tests/test.module';
import { LoginComponent } from './login.component';
import ERROR_MESSAGES from '../../../core/constants/form-errors';
import { PublicService } from '../../services/public.service';
import { of, throwError } from 'rxjs';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { Router } from '@angular/router';
import { DashboardComponent } from '../../../private/dashboard/components/dashboard/dashboard.component';

describe('LoginComponent', () => {
  test('it should render email, password fields and submit button', async () => {
    await render(LoginComponent, {
      imports: [TestModule],
    });

    const emailControl = screen.getByRole('textbox', { name: /email/i });
    const passwordControl = screen.getByLabelText(/password/i);
    const submitControl = screen.getByRole('button', { name: /login/i });

    expect(emailControl).toBeInTheDocument();
    expect(passwordControl).toBeInTheDocument();
    expect(submitControl).toBeInTheDocument();
  });

  test('it should render forget password link and navigate', async () => {
    await render(LoginComponent, {
      imports: [TestModule],
      routes: [
        { path: '', component: LoginComponent },
        { path: 'auth/forgot-password', component: ForgotPasswordComponent },
      ],
    });

    const router = TestBed.inject(Router);
    jest.spyOn(router, 'navigateByUrl');

    const linkElement = screen.getByRole('link', {
      name: /Forgot Password ?/i,
    });

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/auth/forgot-password');

    await userEvent.click(linkElement);
    await waitFor(() => {
      expect(router.navigateByUrl).toHaveBeenCalled();
    });
  });

  test('it is possible to fill in a form and verify error messages', async () => {
    const { detectChanges } = await render(LoginComponent, {
      imports: [TestModule],
    });

    const emailControl = screen.getByRole('textbox', { name: /email/i });
    const passwordControl = screen.getByLabelText(/password/i);

    expect(emailControl).toBeInvalid();
    expect(passwordControl).toBeInvalid();

    fireEvent.blur(emailControl);
    fireEvent.blur(passwordControl);

    expect(
      screen.getByText(ERROR_MESSAGES['emailRequired'])
    ).toBeInTheDocument();

    expect(
      screen.getByText(ERROR_MESSAGES['passwordRequired'])
    ).toBeInTheDocument();

    await userEvent.type(emailControl, 'john@gmail.com');
    await userEvent.type(passwordControl, '123456');

    expect(emailControl).toBeValid();
    expect(emailControl).toHaveValue('john@gmail.com');

    expect(passwordControl).toBeValid();
    expect(passwordControl).toHaveValue('123456');

    detectChanges();

    expect(
      screen.queryByText(ERROR_MESSAGES['emailRequired'])
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText(ERROR_MESSAGES['passwordRequired'])
    ).not.toBeInTheDocument();
  });

  test('login API should be called only if the form is valid', async () => {
    const mockLoginService = createMock(PublicService);
    mockLoginService.login.mockImplementation(() => of({}));

    const { fixture } = await render(LoginComponent, {
      imports: [TestModule],
      componentProviders: [
        { provide: PublicService, useValue: mockLoginService },
      ],
    });

    const loginService = TestBed.inject(PublicService);
    const submitControl = screen.getByRole('button', { name: /login/i });
    const emailControl = screen.getByRole('textbox', { name: /email/i });
    const passwordControl = screen.getByLabelText(/password/i);

    userEvent.click(submitControl);

    await waitFor(() => {
      expect(fixture.componentInstance.form.invalid).toEqual(true);
      expect(loginService.login).toHaveBeenCalledTimes(0);
    });

    await userEvent.type(emailControl, 'john@gmail.com');
    await userEvent.type(passwordControl, '123456');

    userEvent.click(submitControl);

    await waitFor(() => {
      expect(fixture.componentInstance.form.valid).toEqual(true);
      expect(loginService.login).toHaveBeenCalledTimes(1);
      expect(loginService.login).toHaveBeenCalledWith(
        fixture.componentInstance.form.value
      );
    });
  });

  test('it should render an alert message if login api fails', async () => {
    const mockLoginService = createMock(PublicService);
    mockLoginService.login.mockImplementation(() =>
      throwError(() => ({
        statusCode: 404,
        message: 'Invalid email or password',
      }))
    );

    const { fixture, detectChanges } = await render(LoginComponent, {
      imports: [TestModule],
      componentProviders: [
        {
          provide: PublicService,
          useValue: mockLoginService,
        },
      ],
      routes: [{ path: 'app/dashboard', component: DashboardComponent }],
    });

    const submitControl = screen.getByRole('button', { name: /login/i });
    const loginService = TestBed.inject(PublicService);

    fixture.componentInstance.form.setValue({
      email: 'john@gmail.com',
      password: '123456',
    });

    await userEvent.click(submitControl);

    waitFor(() => {
      expect(loginService.login).toHaveBeenCalledTimes(1);
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Invalid email or password'
      );
    });
  });
});
