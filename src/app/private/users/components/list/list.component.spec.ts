import { render, screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { createMock } from '@testing-library/angular/jest-utils';

import { TestModule } from '../../../../../tests/test.module';

import { ListComponent } from './list.component';
import { UsersService } from '../../services/users.service';
import { of, throwError } from 'rxjs';
import USERS_MOCK from '../../../../../tests/mocks/users';
import USER_TABLE_COLUMNS from '../../constants/users-table-columns';
import { DrawerComponent } from '@shared/drawer/drawer.component';
import { AddComponent } from '../add/add.component';

describe('ListComponent', () => {
  test('should render a page heading', async () => {
    const mockUserService = createMock(UsersService);
    mockUserService.getUsers.mockImplementation(() =>
      of({ data: { users: USERS_MOCK } })
    );

    await render(ListComponent, {
      imports: [TestModule],
      componentProviders: [
        { provide: UsersService, useValue: mockUserService },
      ],
    });

    expect(screen.getByRole('heading', { name: /users/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /users/i })).toHaveClass(
      'page-title'
    );
  });

  test('it should render list of users in a table', async () => {
    const mockUserService = createMock(UsersService);
    mockUserService.getUsers.mockImplementation(() =>
      of({ data: { users: USERS_MOCK } })
    );

    const { fixture } = await render(ListComponent, {
      imports: [TestModule],
      componentProviders: [
        { provide: UsersService, useValue: mockUserService },
      ],
    });

    expect(screen.getByRole('table')).toBeInTheDocument();

    const [thead, tbody] = screen.getAllByRole('rowgroup');

    // Thead
    const headerRow = within(thead).getByRole('row');
    const headerCells = within(thead).getAllByRole('columnheader');

    expect(thead).toBeInTheDocument();
    expect(headerRow).toBeInTheDocument();
    expect(headerCells).toHaveLength(USER_TABLE_COLUMNS.length);
    headerCells.forEach((th) => {
      expect(th.textContent).toBeTruthy();
    });

    // tbody
    const bodyRows = within(tbody).getAllByRole('row');

    expect(tbody).toBeInTheDocument();
    expect(bodyRows).toHaveLength(USERS_MOCK.length);

    bodyRows.forEach((tr, index) => {
      const tdCells = within(tr).getAllByRole('cell');
      expect(tdCells).toHaveLength(USER_TABLE_COLUMNS.length);
      expect(tdCells[0]).toHaveTextContent(USERS_MOCK[index].id.toString());
      expect(tdCells[1]).toHaveTextContent(
        USERS_MOCK[index].first_name + ' ' + USERS_MOCK[index].last_name
      );
      expect(tdCells[2]).toHaveTextContent(USERS_MOCK[index].email);
      expect(tdCells[3]).toHaveTextContent(USERS_MOCK[index].phone);
      expect(tdCells[4]).toHaveTextContent(
        fixture.componentInstance.rolesMapping[USERS_MOCK[index].role_id]
      );
    });
  });

  test('should display no data message if no users exist', async () => {
    const mockUsersService = createMock(UsersService);
    mockUsersService.getUsers.mockImplementation(() =>
      of({ data: { users: [] } })
    );

    await render(ListComponent, {
      imports: [TestModule],
      componentProviders: [
        { provide: UsersService, useValue: mockUsersService },
      ],
    });

    const [thead, tbody] = screen.getAllByRole('rowgroup');
    expect(thead).toBeInTheDocument();
    expect(within(thead).getAllByRole('columnheader')).toHaveLength(
      USER_TABLE_COLUMNS.length
    );
    expect(within(tbody).queryByRole('row')).toBeNull();

    expect(screen.getByText('No Data available')).toBeInTheDocument();
  });

  test('it should not render the spinner if API throws an error', async () => {
    const mockUsersService = createMock(UsersService);
    mockUsersService.getUsers.mockImplementation(() =>
      throwError(() => ({ statusCode: 400, message: 'Bad request' }))
    );

    await render(ListComponent, {
      imports: [TestModule],
      componentProviders: [
        { provide: UsersService, useValue: mockUsersService },
      ],
    });

    expect(screen.queryByRole('progressbar')).toBeNull();
  });

  test('it should render the add user button', async () => {
    const mockUserService = createMock(UsersService);
    mockUserService.getUsers.mockImplementation(() =>
      of({ data: { users: USERS_MOCK } })
    );

    await render(ListComponent, {
      declarations: [DrawerComponent],
      imports: [TestModule],
      componentProviders: [
        { provide: UsersService, useValue: mockUserService },
      ],
    });

    expect(
      screen.getByRole('button', { name: /add user/i })
    ).toBeInTheDocument();
  });

  test('clicking add user button should open the drawer', async () => {
    const mockUserService = createMock(UsersService);
    mockUserService.getUsers.mockImplementation(() =>
      of({ data: { users: USERS_MOCK } })
    );

    const { detectChanges } = await render(ListComponent, {
      declarations: [DrawerComponent, AddComponent],
      imports: [TestModule],
      componentProviders: [
        { provide: UsersService, useValue: mockUserService },
      ],
    });

    const addUserBtn = screen.getByRole('button', { name: /add user/i });

    await userEvent.click(addUserBtn);

    detectChanges();

    expect(screen.getByRole('complementary')).toBeInTheDocument();
    expect(screen.getByRole('complementary')).toHaveClass('drawer--open');

    expect(screen.getByRole('presentation')).toBeInTheDocument();
    expect(screen.getByRole('presentation')).toHaveClass('drawer-overlay');

    expect(
      screen.getByRole('heading', { name: /Add new user/i })
    ).toBeInTheDocument();
  });

  test('clicking close button should close the drawer', async () => {
    const mockUserService = createMock(UsersService);
    mockUserService.getUsers.mockImplementation(() =>
      of({ data: { users: USERS_MOCK } })
    );

    const { fixture, detectChanges } = await render(ListComponent, {
      declarations: [DrawerComponent, AddComponent],
      imports: [TestModule],
      componentProviders: [
        { provide: UsersService, useValue: mockUserService },
      ],
    });

    const addUserBtn = screen.getByRole('button', { name: /add user/i });
    await userEvent.click(addUserBtn);
    detectChanges();

    fixture.componentInstance.closeClickHandler('ADD');
    detectChanges();

    expect(screen.getByRole('complementary')).toBeInTheDocument();
    expect(screen.getByRole('complementary')).not.toHaveClass('drawer--open');

    expect(screen.queryByRole('presentation')).toBeNull();

    expect(screen.queryByRole('heading', { name: /Add new user/i })).toBeNull();
  });
});
