import { render, screen, fireEvent, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { TestBed } from '@angular/core/testing';
import { createMock } from '@testing-library/angular/jest-utils';

import { TestModule } from '../../../../tests/test.module';
import { ResetPasswordComponent } from './reset-password.component';
import ERROR_MESSAGES from '../../../core/constants/form-errors';
import { PublicService } from '../../services/public.service';
import { of, throwError } from 'rxjs';

describe('ResetPasswordComponent', () => {
  test('it should render new password and confirm password fields', async () => {
    await render(ResetPasswordComponent, {
      imports: [TestModule],
    });

    const newPasswordControl = screen.getByLabelText(/New Password/i);
    const confirmPasswordControl = screen.getByLabelText(/Confirm Password/i);
    const submitControl = screen.getByRole('button', {
      name: /change password/i,
    });
    expect(newPasswordControl).toBeInTheDocument();
    expect(confirmPasswordControl).toBeInTheDocument();
    expect(submitControl).toBeInTheDocument();
  });

  test('it should render instructions to set password', async () => {
    await render(ResetPasswordComponent, {
      imports: [TestModule],
    });

    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  test('it is possible to fill in a form and verify error messages', async () => {
    await render(ResetPasswordComponent, {
      imports: [TestModule],
    });

    const newPasswordControl = screen.getByLabelText(/New Password/i);
    const confirmPasswordControl = screen.getByLabelText(/Confirm Password/i);

    fireEvent.blur(newPasswordControl);
    fireEvent.blur(confirmPasswordControl);

    expect(newPasswordControl).toBeInvalid();
    expect(confirmPasswordControl).toBeInvalid();

    expect(
      screen.getAllByText(ERROR_MESSAGES['passwordRequired'])
    ).toHaveLength(2);

    await userEvent.type(newPasswordControl, '123456');
    await userEvent.type(confirmPasswordControl, '123456');

    expect(newPasswordControl).toBeInvalid();
    expect(confirmPasswordControl).toBeInvalid();
    expect(screen.getAllByText(ERROR_MESSAGES['strongPassword'])).toHaveLength(
      2
    );

    await userEvent.clear(newPasswordControl);
    await userEvent.clear(confirmPasswordControl);
    await userEvent.type(newPasswordControl, 'Qwerty@123');
    await userEvent.type(confirmPasswordControl, 'Qwerty@123');

    expect(newPasswordControl).toBeValid();
    expect(confirmPasswordControl).toBeValid();
    expect(newPasswordControl).toHaveValue('Qwerty@123');
    expect(confirmPasswordControl).toHaveValue('Qwerty@123');

    expect(screen.queryByText(ERROR_MESSAGES['passwordRequired'])).toBeNull();
    expect(screen.queryByText(ERROR_MESSAGES['strongPassword'])).toBeNull();
  });

  test('password and confirm password should have same values', async () => {
    await render(ResetPasswordComponent, {
      imports: [TestModule],
    });
    const newPasswordControl = screen.getByLabelText(/New Password/i);
    const confirmPasswordControl = screen.getByLabelText(/Confirm Password/i);

    await userEvent.type(newPasswordControl, 'Qwerty@123');
    await userEvent.type(confirmPasswordControl, 'Qwerty@1234');

    expect(
      screen.getByText(ERROR_MESSAGES['passwordNotMatching'])
    ).toBeInTheDocument();
  });

  test('API call should be made only if the form is valid', async () => {
    const mockService = createMock(PublicService);
    mockService.changePassword.mockImplementation(() => of({}));

    const { fixture } = await render(ResetPasswordComponent, {
      imports: [TestModule],
      componentProviders: [{ provide: PublicService, useValue: mockService }],
    });

    const service = TestBed.inject(PublicService);
    const newPasswordControl = screen.getByLabelText(/New Password/i);
    const confirmPasswordControl = screen.getByLabelText(/Confirm Password/i);
    const submitControl = screen.getByRole('button', {
      name: /change password/i,
    });

    await userEvent.click(submitControl);

    expect(service.changePassword).not.toHaveBeenCalled();

    await userEvent.type(newPasswordControl, 'Qwerty@123');
    await userEvent.type(confirmPasswordControl, 'Qwerty@123');
    await userEvent.click(submitControl);

    expect(service.changePassword).toHaveBeenCalledTimes(1);
    expect(service.changePassword).toHaveBeenCalledWith(
      fixture.componentInstance.form.value.password
    );
  });
});
