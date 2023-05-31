import { ForgotPasswordComponent } from './forgot-password.component';
import { TestModule } from '../../../../tests/test.module';
import ERROR_MESSAGES from '../../../core/constants/form-errors';

import { render, screen, fireEvent, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { TestBed } from '@angular/core/testing';
import { createMock } from '@testing-library/angular/jest-utils';

import { PublicService } from '../../services/public.service';
import { of, throwError } from 'rxjs';
import { ForgotPasswordEmailSentComponent } from '../forgot-password-email-sent/forgot-password-email-sent.component';

import { Router } from '@angular/router';

describe('ForgotPasswordComponent', () => {
  test('it should render email field and submit button', async () => {
    await render(ForgotPasswordComponent, {
      imports: [TestModule],
    });

    const emailControl = screen.getByRole('textbox', { name: /email/i });
    const submitControl = screen.getByRole('button', {
      name: /reset password/i,
    });

    expect(emailControl).toBeInTheDocument();
    expect(submitControl).toBeInTheDocument();
  });

  test('it should render back to login link', async () => {
    await render(ForgotPasswordComponent, {
      imports: [TestModule],
    });

    const link = screen.getByRole('link', { name: /back to login/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/auth/login');
  });

  test('it is possible to fill in a form and verify error messages', async () => {
    const { detectChanges } = await render(ForgotPasswordComponent, {
      imports: [TestModule],
    });

    const emailControl = screen.getByRole('textbox', { name: /email/i });

    expect(emailControl).toBeInvalid();

    fireEvent.blur(emailControl);

    expect(
      await screen.findByText(ERROR_MESSAGES['emailRequired'])
    ).toBeInTheDocument();

    await userEvent.type(emailControl, 'abc');

    expect(
      await screen.findByText(ERROR_MESSAGES['invalidEmail'])
    ).toBeInTheDocument();

    await userEvent.clear(emailControl);
    await userEvent.type(emailControl, 'john@gmail.com');

    detectChanges();

    expect(emailControl).toBeValid();
    expect(screen.queryByText(ERROR_MESSAGES['emailRequired'])).toBeNull();
    expect(screen.queryByText(ERROR_MESSAGES['invalidEmail'])).toBeNull();
  });

  test('Api call should be made only if the form is valid', async () => {
    const mockService = createMock(PublicService);
    mockService.sendResetPasswordMail.mockImplementation(() => of({}));

    const { fixture } = await render(ForgotPasswordComponent, {
      imports: [TestModule],
      declarations: [ForgotPasswordEmailSentComponent],
      componentProviders: [{ provide: PublicService, useValue: mockService }],
      routes: [
        { path: 'forgot-password', component: ForgotPasswordComponent },
        { path: 'email-sent', component: ForgotPasswordEmailSentComponent },
      ],
    });

    const service = TestBed.inject(PublicService);
    const submitBtn = screen.getByRole('button', { name: /reset password/i });
    const emailControl = screen.getByRole('textbox', { name: /email/i });

    userEvent.click(submitBtn);

    expect(service.sendResetPasswordMail).not.toHaveBeenCalled();

    await userEvent.type(emailControl, 'john@gmail.com');
    await userEvent.click(submitBtn);

    expect(service.sendResetPasswordMail).toHaveBeenCalledTimes(1);
    expect(service.sendResetPasswordMail).toHaveBeenCalledWith(
      fixture.componentInstance.form.value.email
    );
  });

  test('should render an alert if api throws an error', async () => {
    const mockService = createMock(PublicService);
    mockService.sendResetPasswordMail.mockImplementation(() =>
      throwError(() => ({ statusCode: 404, message: 'Email does not exists' }))
    );

    const { fixture } = await render(ForgotPasswordComponent, {
      imports: [TestModule],
      componentProviders: [{ provide: PublicService, useValue: mockService }],
    });

    const service = TestBed.inject(PublicService);
    const submitBtn = screen.getByRole('button', { name: /reset password/i });
    const emailControl = screen.getByRole('textbox', { name: /email/i });

    await userEvent.type(emailControl, 'john@gmail.com');
    await userEvent.click(submitBtn);

    expect(service.sendResetPasswordMail).toHaveBeenCalledTimes(1);
    expect(service.sendResetPasswordMail).toHaveBeenCalledWith(
      fixture.componentInstance.form.value.email
    );

    const alert = await screen.findByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent('Email does not exists');
  });

  test('should navigate to email-sent screen if API returns success response', async () => {
    const mockService = createMock(PublicService);
    mockService.sendResetPasswordMail.mockImplementation(() =>
      of({ statusCode: 200, message: 'Email sent', data: {} })
    );

    const { fixture } = await render(ForgotPasswordComponent, {
      imports: [TestModule],
      providers: [{ provide: PublicService, useValue: mockService }],
      declarations: [ForgotPasswordEmailSentComponent],
      routes: [
        { path: 'forgot-password', component: ForgotPasswordComponent },
        { path: 'email-sent', component: ForgotPasswordEmailSentComponent },
      ],
    });

    const service = TestBed.inject(PublicService);
    const router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');

    const submitBtn = screen.getByRole('button', { name: /reset password/i });
    const emailControl = screen.getByRole('textbox', { name: /email/i });

    await userEvent.type(emailControl, 'john@gmail.com');
    await userEvent.click(submitBtn);

    expect(service.sendResetPasswordMail).toHaveBeenCalledTimes(1);
    expect(service.sendResetPasswordMail).toHaveBeenCalledWith(
      fixture.componentInstance.form.get('email')?.value
    );
    expect(router.navigate).toHaveBeenCalledWith(['/email-sent']);
  });
});
