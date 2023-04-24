import { render } from '@testing-library/angular';
import { HeaderComponent } from './header.component';

describe('LayoutComponent', () => {
  test('it should render layout component', async () => {
    const { fixture } = await render(HeaderComponent);

    expect(fixture).toBeTruthy();
  });
});
