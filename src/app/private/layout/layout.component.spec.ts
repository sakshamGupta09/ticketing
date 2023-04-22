import { render } from '@testing-library/angular';
import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  test('it should render layout component', async () => {
    const { fixture } = await render(LayoutComponent);

    expect(fixture).toBeTruthy();
  });
});
