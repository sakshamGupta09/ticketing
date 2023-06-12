import { createMock } from '@testing-library/angular/jest-utils';
import { AddComponent } from './add.component';
import { UsersService } from '../../services/users.service';
import { render } from '@testing-library/angular';
import { TestModule } from '../../../../../tests/test.module';

describe('AddComponent', () => {
  test('it should render the component', async () => {
    const mockUserService = createMock(UsersService);
    const { fixture } = await render(AddComponent, {
      imports: [TestModule],
      providers: [{ provide: UsersService, useValue: mockUserService }],
    });

    expect(fixture.componentInstance).toBeTruthy();
  });
});
