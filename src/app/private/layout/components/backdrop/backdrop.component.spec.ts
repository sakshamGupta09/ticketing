import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { TestModule } from '../../../../../tests/test.module';
import { BackdropComponent } from './backdrop.component';

describe('BackdropComponent', () => {
  test('It should render the backdrop', async () => {
    await render(BackdropComponent, {
      imports: [TestModule],
    });

    expect(screen.getByRole('presentation')).toBeInTheDocument();
    expect(screen.getByRole('presentation')).toHaveClass('backdrop');
  });

  test('it is possible to listen for output event', async () => {
    const outputMock = jest.fn();

    await render(BackdropComponent, {
      componentOutputs: {
        backdropClicked: {
          emit: outputMock,
        } as any,
      },
      imports: [TestModule],
    });

    const backdropElement = screen.getByRole('presentation');
    await userEvent.click(backdropElement);

    expect(outputMock).toHaveBeenCalled();
    expect(outputMock).toHaveBeenCalledTimes(1);
  });
});
