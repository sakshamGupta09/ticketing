import { render } from '@testing-library/angular';
import { BackdropComponent } from './backdrop.component';

describe('LayoutComponent', () => {
  test('it should render layout component', async () => {
    const { fixture } = await render(BackdropComponent);

    expect(fixture).toBeTruthy();
  });
});
