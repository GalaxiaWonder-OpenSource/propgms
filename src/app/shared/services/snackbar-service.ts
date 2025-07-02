import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  show(
    message: string,
    action: string = 'OK',
    config: Partial<MatSnackBarConfig> = {}
  ): void {
    const defaultConfig: MatSnackBarConfig = {
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-default']
    };

    this.snackBar.open(message, action, {
      ...defaultConfig,
      ...config
    });
  }

  success(message: string): void {
    this.show(message, 'OK', { panelClass: ['snackbar-success'] });
  }

  error(message: string): void {
    this.show(message, 'Dismiss', { panelClass: ['snackbar-error'] });
  }

  warning(message: string): void {
    this.show(message, 'Close', { panelClass: ['snackbar-warning'] });
  }

  info(message: string): void {
    this.show(message, 'OK', { panelClass: ['snackbar-info'] });
  }
}

