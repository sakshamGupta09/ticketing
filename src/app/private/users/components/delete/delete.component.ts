import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent {
  @Input() userId: number | null = null;

  public isLoading = false;

  @Output() closePopupClicked: EventEmitter<void> = new EventEmitter();

  @Output() userDeleted: EventEmitter<number> = new EventEmitter();

  constructor(private service: UsersService) {}

  public deleteClickHandler(): void {
    this.isLoading = true;
    if (this.userId) {
      this.service.deleteUser(this.userId).subscribe({
        next: () => {
          this.userDeleted.emit(this.userId!);
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        },
      });
    }
  }

  public closeClickHandler(): void {
    this.closePopupClicked.emit();
  }
}
