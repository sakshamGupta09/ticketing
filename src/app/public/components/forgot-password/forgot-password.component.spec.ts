import { ForgotPasswordComponent } from './forgot-password.component';
import { TestModule } from '../../../../tests/test.module';
import ERROR_MESSAGES from '../../../core/constants/form-errors';

import { render, screen, fireEvent } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { TestBed } from '@angular/core/testing';
import { createMock } from '@testing-library/angular/jest-utils';

import { PublicService } from '../../services/public.service';
import { of, throwError } from 'rxjs';

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
    expect(link).toHaveAttribute('href', '/login');
  });

  test('it is possible to fill in a form and verify error messages', async () => {
    await render(ForgotPasswordComponent, {
      imports: [TestModule],
    });

    const emailControl = screen.getByRole('textbox', { name: /email/i });

    expect(emailControl).toBeInvalid();

    fireEvent.blur(emailControl);

    expect(
      screen.getByText(ERROR_MESSAGES['emailRequired'])
    ).toBeInTheDocument();

    await userEvent.type(emailControl, 'abc');

    expect(
      screen.getByText(ERROR_MESSAGES['invalidEmail'])
    ).toBeInTheDocument();

    await userEvent.clear(emailControl);
    await userEvent.type(emailControl, 'john@gmail.com');

    expect(emailControl).toBeValid();
    expect(screen.queryByText(ERROR_MESSAGES['emailRequired'])).toBeNull();
    expect(screen.queryByText(ERROR_MESSAGES['invalidEmail'])).toBeNull();
  });

  test('Api call should be made only if the form is valid', async () => {
    const mockService = createMock(PublicService);
    mockService.sendResetPasswordMail.mockImplementation(() => of({}));

    const { fixture } = await render(ForgotPasswordComponent, {
      imports: [TestModule],
      componentProviders: [{ provide: PublicService, useValue: mockService }],
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
      throwError(() => new Error('Something went wrong'))
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
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent(
      ERROR_MESSAGES['forgotPasswordFailed']
    );
  });
});
