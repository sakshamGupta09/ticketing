import { render } from '@testing-library/angular';
import { SidebarComponent } from './sidebar.component';

describe('LayoutComponent', () => {
  test('it should render layout component', async () => {
    const { fixture } = await render(SidebarComponent);

    expect(fixture).toBeTruthy();
  });
});
