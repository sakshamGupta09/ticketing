import { render, screen } from '@testing-library/angular';
import { ForgotPasswordEmailSentComponent } from './forgot-password-email-sent.component';

describe('ForgotPasswordEmailSentComponent', () => {
  test('it should render email sent message', async () => {
    await render(ForgotPasswordEmailSentComponent);

    const imageElement = screen.getByRole('img', { name: /email sent/i });
    const headingElement = screen.getByText('Email Sent!');
    const descriptionElement = screen.getByText(
      'You are all set, please check your inbox and follow the instructions to reset your password.'
    );

    expect(imageElement).toBeInTheDocument();
    expect(headingElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  test('it should render back to login link', async () => {
    await render(ForgotPasswordEmailSentComponent);

    const linkElement = screen.getByRole('link', { name: /Back to login/i });

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/login');
  });
});
