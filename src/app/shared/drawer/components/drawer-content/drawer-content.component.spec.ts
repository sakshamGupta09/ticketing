import { render, screen, within } from '@testing-library/angular';
import { TestModule } from '../../../../../tests/test.module';
import { DrawerContentComponent } from './drawer-content.component';
import userEvent from '@testing-library/user-event';

describe('DrawerContentComponent', () => {
  test('it should render header, body and footer elements', async () => {
    await render(DrawerContentComponent, {
      imports: [TestModule],
    });

    expect(screen.getByTestId('drawer-header')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-header')).toHaveClass(
      'drawer__header flex justify-between gap-2 items-center'
    );

    expect(screen.getByTestId('drawer-body')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-body')).toHaveClass(
      'drawer__body flex-grow overflow-y-auto'
    );

    expect(screen.getByTestId('drawer-footer')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-footer')).toHaveClass('drawer__footer');
  });

  test('close drawer button should be functional', async () => {
    const mockFn = jest.fn();

    await render(DrawerContentComponent, {
      componentOutputs: {
        closeClicked: { emit: mockFn } as any,
      },
      imports: [TestModule],
    });

    const closeButton = screen.getByRole('button');
    expect(closeButton).toBeInTheDocument();

    await userEvent.click(closeButton);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('content projection should be functional', async () => {
    const modalTitle = 'Modal header';
    await render(
      `<app-drawer-content>
        <ng-container title>${modalTitle}</ng-container>
        <ng-container body>${modalTitle}</ng-container>
        <ng-container footer>${modalTitle}</ng-container>

      </app-drawer-content>`,
      { declarations: [DrawerContentComponent], imports: [TestModule] }
    );

    expect(
      screen.getByRole('heading', { name: modalTitle })
    ).toBeInTheDocument();

    const drawerBody = screen.getByTestId('drawer-body');
    const drawerFooter = screen.getByTestId('drawer-footer');

    expect(within(drawerBody).getByText(modalTitle)).toBeInTheDocument();
    expect(within(drawerFooter).getByText(modalTitle)).toBeInTheDocument();
  });
});
