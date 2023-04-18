import { render, screen, fireEvent } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { TestModule } from '../../../../tests/test.module';
import { LoginComponent } from './login.component';
import ERROR_MESSAGES from '../../../core/constants/form-errors';

describe('LoginComponent', () => {
  test('it should render email, password fields and submit button', async () => {
    const { fixture } = await render(LoginComponent, {
      imports: [TestModule],
    });

    const emailControl = screen.getByRole('textbox', { name: /email/i });
    const passwordControl = screen.getByLabelText(/password/i);
    const submitControl = screen.getByRole('button', { name: /login/i });

    expect(emailControl).toBeInTheDocument();
    expect(passwordControl).toBeInTheDocument();
    expect(submitControl).toBeInTheDocument();
  });

  test('it should render forget password link', async () => {
    await render(LoginComponent, {
      imports: [TestModule],
    });

    const linkElement = screen.getByRole('link', {
      name: /Forgot Password ?/i,
    });

    expect(linkElement).toBeInTheDocument();
  });

  test('it is possible to fill in a form and verify error messages', async () => {
    await render(LoginComponent, {
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

    expect(
      screen.queryByText(ERROR_MESSAGES['emailRequired'])
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText(ERROR_MESSAGES['passwordRequired'])
    ).not.toBeInTheDocument();
  });
});
