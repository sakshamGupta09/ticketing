import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { TestBed } from '@angular/core/testing';
import { createMock } from '@testing-library/angular/jest-utils';

import { TestModule } from '../../../../../tests/test.module';

import { ListComponent } from './list.component';
import { UsersService } from '../../services/users.service';
import { of } from 'rxjs';
import USERS_MOCK from '../../../../../tests/mocks/users';
import USER_TABLE_COLUMNS from '../../constants/users-table-columns';

describe('ListComponent', () => {
  it('should render a page heading', async () => {
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

  it('it should render list of users in a table', async () => {
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

    const usersService = TestBed.inject(UsersService);
    expect(screen.getByRole('table')).toBeInTheDocument();

    const [thead, tbody, tfooter] = screen.getAllByRole('rowgroup');

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
});
