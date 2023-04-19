import { render, screen } from '@testing-library/angular';

import { TestModule } from '../../../../../tests/test.module';
import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  test('it should render an error alert with proper styles', async () => {
    const { fixture } = await render(AlertComponent, {
      imports: [TestModule],
      componentInputs: {
        type: 'error',
        title: 'Something went wrong',
      },
    });

    const alertElement = screen.getByRole('alert');

    expect(alertElement).toBeInTheDocument();
    expect(alertElement).toHaveClass('text-white');
    expect(alertElement.style.backgroundColor).toBeTruthy();
    expect(
      screen.getByText(fixture.componentInstance.title)
    ).toBeInTheDocument();
  });
});
