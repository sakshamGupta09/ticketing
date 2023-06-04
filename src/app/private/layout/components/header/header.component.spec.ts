import { render, screen, fireEvent, waitFor } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { TestModule } from '../../../../../tests/test.module';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  test('It is possible to listen for output event', async () => {
    const outputMock = jest.fn();

    const { fixture } = await render(HeaderComponent, {
      componentOutputs: {
        menuClicked: {
          emit: outputMock,
        } as any,
      },
      imports: [TestModule],
    });

    jest.spyOn(fixture.componentInstance, 'menuClickHandler');

    const menuButton = screen.getByRole('button');
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveClass('menu-bar');

    await userEvent.click(menuButton);

    expect(fixture.componentInstance.menuClickHandler).toHaveBeenCalled();
    expect(outputMock).toHaveBeenCalled();
    expect(outputMock).toHaveBeenCalledTimes(1);
  });
});
