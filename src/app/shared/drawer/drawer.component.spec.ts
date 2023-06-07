import { render, screen, within } from '@testing-library/angular';
import { DrawerComponent } from './drawer.component';
import { TestModule } from '../../../tests/test.module';

describe('DrawerComponent', () => {
  test('it should render the drawer based on Input property', async () => {
    await render(DrawerComponent, {
      componentInputs: { isVisible: false },
      imports: [TestModule],
    });

    expect(screen.getByRole('complementary')).toBeInTheDocument();
    expect(screen.getByRole('complementary')).not.toHaveClass('drawer--open');

    expect(screen.queryByRole('presentation')).toBeNull();
  });

  test('it should render drawer in opened state if input is truthy', async () => {
    await render(DrawerComponent, {
      componentInputs: { isVisible: true },
      imports: [TestModule],
    });

    expect(screen.getByRole('complementary')).toBeInTheDocument();
    expect(screen.getByRole('complementary')).toHaveClass('drawer--open');

    expect(screen.getByRole('presentation')).toBeInTheDocument();
    expect(screen.getByRole('presentation')).toHaveClass('drawer-overlay');
  });

  test('it should render projected content', async () => {
    const projection = 'it should be srendered inside drawer!';

    await render(`<app-drawer [isVisible]="true">${projection}</app-drawer>`, {
      declarations: [DrawerComponent],
      imports: [TestModule],
    });

    const drawerElement = screen.getByRole('complementary');

    expect(screen.getByText(projection)).toBeInTheDocument();
    expect(within(drawerElement).getByText(projection)).toBeInTheDocument();
  });
});
