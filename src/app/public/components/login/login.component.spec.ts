import { render, screen, fireEvent } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { TestModule } from '../../../../tests/test.module';

import { LoginComponent } from './login.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

describe('LoginComponent', () => {
  test('it should render email and password fields', async () => {
    const { fixture } = await render(LoginComponent, {
      imports: [TestModule],
    });

    const emailControl = screen.getByRole('textbox', { name: /email/i });
    const passwordControl = screen.getByLabelText(/password/i);

    expect(emailControl).toBeInTheDocument();
    expect(passwordControl).toBeInTheDocument();
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
});
