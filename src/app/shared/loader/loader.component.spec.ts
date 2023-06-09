import { render, screen } from '@testing-library/angular';
import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  test('it should render the spinner', async () => {
    await render(LoaderComponent);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveClass('loader-container');
    expect(screen.getByRole('progressbar')).toContainHTML(
      '<span class="loader"></span>'
    );
  });
});
