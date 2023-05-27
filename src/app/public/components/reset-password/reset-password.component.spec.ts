import { render, screen, fireEvent } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { TestBed } from '@angular/core/testing';
import { createMock } from '@testing-library/angular/jest-utils';

import { TestModule } from '../../../../tests/test.module';
import { ResetPasswordComponent } from './reset-password.component';
import ERROR_MESSAGES from '../../../core/constants/form-errors';
import { PublicService } from '../../services/public.service';
import { of, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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

    expect(
      screen.getByText(
        '* Password should contain a minimum of 8 characters with at least a symbol, upper and lower case letters and a number.'
      )
    ).toBeInTheDocument();
  });

  test('it is possible to fill in a form and verify error messages', async () => {
    const { detectChanges } = await render(ResetPasswordComponent, {
      imports: [TestModule],
    });

    const newPasswordControl = screen.getByLabelText(/New Password/i);
    const confirmPasswordControl = screen.getByLabelText(/Confirm Password/i);

    expect(newPasswordControl).toBeInvalid();
    expect(confirmPasswordControl).toBeInvalid();

    fireEvent.blur(newPasswordControl);
    fireEvent.blur(confirmPasswordControl);

    expect(
      await screen.findAllByText(ERROR_MESSAGES['passwordRequired'])
    ).toHaveLength(2);

    await userEvent.type(newPasswordControl, '123456');
    await userEvent.type(confirmPasswordControl, '123456');

    detectChanges();

    expect(newPasswordControl).toBeInvalid();
    expect(confirmPasswordControl).toBeInvalid();
    expect(screen.getAllByText(ERROR_MESSAGES['strongPassword'])).toHaveLength(
      2
    );

    await userEvent.clear(newPasswordControl);
    await userEvent.clear(confirmPasswordControl);
    await userEvent.type(newPasswordControl, 'Qwerty@123');
    await userEvent.type(confirmPasswordControl, 'Qwerty@123');

    detectChanges();

    expect(newPasswordControl).toBeValid();
    expect(confirmPasswordControl).toBeValid();
    expect(newPasswordControl).toHaveValue('Qwerty@123');
    expect(confirmPasswordControl).toHaveValue('Qwerty@123');

    expect(screen.queryByText(ERROR_MESSAGES['passwordRequired'])).toBeNull();
    expect(screen.queryByText(ERROR_MESSAGES['strongPassword'])).toBeNull();
  });

  test('password and confirm password should have same values', async () => {
    const { detectChanges } = await render(ResetPasswordComponent, {
      imports: [TestModule],
    });
    const newPasswordControl = screen.getByLabelText(/New Password/i);
    const confirmPasswordControl = screen.getByLabelText(/Confirm Password/i);

    await userEvent.type(newPasswordControl, 'Qwerty@123');
    await userEvent.type(confirmPasswordControl, 'Qwerty@1234');

    detectChanges();

    expect(
      screen.getByText(ERROR_MESSAGES['passwordNotMatching'])
    ).toBeInTheDocument();
  });

  test('API call should be made only if the form is valid', async () => {
    const mockService = createMock(PublicService);
    mockService.changePassword.mockImplementation(() => of({}));

    const mockActivatedRoute = {
      snapshot: {
        params: {
          authToken: 'Some unique token',
        },
      },
    };

    const { fixture } = await render(ResetPasswordComponent, {
      imports: [TestModule],
      componentProviders: [
        {
          provide: PublicService,
          useValue: mockService,
        },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
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
      fixture.componentInstance['authToken'],
      fixture.componentInstance.form.value.password
    );
  });

  test('it should render an error alert if API call fails', async () => {
    const mockService = createMock(PublicService);
    mockService.changePassword.mockImplementation(() =>
      throwError(() => ({
        statusCode: 404,
        message: 'Any error from server',
      }))
    );

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

    await userEvent.type(newPasswordControl, 'Qwerty@123');
    await userEvent.type(confirmPasswordControl, 'Qwerty@123');

    await userEvent.click(submitControl);

    expect(fixture.componentInstance.alertConfig.type).toBe('error');
    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Any error from server'
    );
  });

  test('it should render success alert if API call succeeds', async () => {
    const mockService = createMock(PublicService);
    mockService.changePassword.mockImplementation(() =>
      of({
        statusCode: 200,
        message: 'Success message from server',
      })
    );

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

    await userEvent.type(newPasswordControl, 'Qwerty@123');
    await userEvent.type(confirmPasswordControl, 'Qwerty@123');

    await userEvent.click(submitControl);

    expect(fixture.componentInstance.alertConfig.type).toBe('success');
    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Success message from server'
    );
  });
});
