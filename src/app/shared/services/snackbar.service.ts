import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  readonly horizontalPosition: MatSnackBarHorizontalPosition = 'right';

  readonly verticalPosition: MatSnackBarVerticalPosition = 'top';

  readonly visibleFor: number = 3000; //millisecs

  readonly cssClasses = {
    success: 'snackbar--success',
    error: 'snackbar--error',
    info: 'snackbar--info',
  };

  constructor(private snackbar: MatSnackBar) {}

  public success(message: string): void {
    this.openSnackbar(message, this.cssClasses.success);
  }

  public error(message: string): void {
    this.openSnackbar(message, this.cssClasses.error);
  }

  private openSnackbar(message: string, cssClass: string): void {
    this.snackbar.open(message, undefined, {
      panelClass: cssClass,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.visibleFor,
    });
  }
}
