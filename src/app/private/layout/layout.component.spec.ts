import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { TestModule } from '../../../tests/test.module';

import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { BackdropComponent } from './components/backdrop/backdrop.component';

describe('LayoutComponent', () => {
  test('it should render header, sidebar and main', async () => {
    await render(LayoutComponent, {
      declarations: [SidebarComponent, HeaderComponent, BackdropComponent],
      imports: [TestModule],
    });

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toHaveClass('header');

    expect(screen.getByRole('presentation')).toBeInTheDocument();
    expect(screen.getByRole('presentation')).toHaveClass('sidebar');

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveClass('layout__content');
  });

  test('toggle sidebar should be functional', async () => {
    const { fixture } = await render(LayoutComponent, {
      componentProperties: {
        isSidebarOpen: true,
      },
      declarations: [SidebarComponent, HeaderComponent, BackdropComponent],
      imports: [TestModule],
    });

    fixture.componentInstance.toggleSidebar();
    expect(fixture.componentInstance.isSidebarOpen).toEqual(false);
  });

  test('backdrop should be displayed if sidebar is open', async () => {
    const { fixture } = await render(LayoutComponent, {
      componentProperties: {
        isSidebarOpen: true,
      },
      declarations: [SidebarComponent, HeaderComponent, BackdropComponent],
      imports: [TestModule],
    });
    jest.spyOn(fixture.componentInstance, 'toggleSidebar');

    const backdrop = screen.getAllByRole('presentation')[1];
    expect(backdrop).toBeInTheDocument();
    expect(backdrop).toHaveClass('backdrop');

    await userEvent.click(backdrop);
    expect(fixture.componentInstance.toggleSidebar).toHaveBeenCalled();
  });
});
