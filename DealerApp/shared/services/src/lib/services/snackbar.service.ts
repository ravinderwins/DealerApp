import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components';
import { SnackbarData } from '../models';

enum SnackBarType {
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
}

export enum SnackBarPosition {
  Start = 'start',
  Center = 'center',
  End = 'end',
  Left = 'left',
  Right = 'right',
}

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackBarRef: MatSnackBarRef<SnackbarComponent>;
  constructor(private snackBar: MatSnackBar) {}

  success(message: string, traceId = '', position = SnackBarPosition.Right, panelClass = '', duration = 5000) {
    const data = { message, traceId };
    this.showSnackBar(data, SnackBarType.Success, position, duration, panelClass);
  }

  warning(message: string, traceId = '', position = SnackBarPosition.Right, panelClass = '', duration = 10000) {
    const data = { message, traceId };
    this.showSnackBar(data, SnackBarType.Warning, position, duration, panelClass);
  }

  error(message: string, status = -1, traceId = '', networkError = false, position = SnackBarPosition.Right, panelClass = '', duration = 10000) {
    const data = { message, traceId, status };
    this.showSnackBar(data, SnackBarType.Danger, position, duration, panelClass, networkError);
  }

  multipleErrors(data: SnackbarData, position = SnackBarPosition.Right, duration = 10000) {
    this.showSnackBar(data, SnackBarType.Danger, position, duration, 'api-error-snackbar');
  }

  multipleWarnings(data: SnackbarData, position = SnackBarPosition.Right, duration = 10000) {
    this.showSnackBar(data, SnackBarType.Warning, position, duration, 'api-error-snackbar');
  }

  dismiss() {
    if (!this.snackBarRef) return;
    this.snackBarRef.dismiss();
  }

  private showSnackBar(data: SnackbarData, type: SnackBarType, position = SnackBarPosition.Right, duration = 10000, panelClass = '', networkError = false) {
    const className: string[] = [type];
    if (panelClass) className.push(panelClass);

    if (!data.title) data.title = this.getTitleKey(type, data.status, networkError);

    const snackBarRef = this.snackBar.openFromComponent(SnackbarComponent, {
      data: data,
      panelClass: className,
      duration: duration,
      horizontalPosition: position,
    });

    // Only Assign if not sucsses. Its hiding success toast as well on route change
    if (type !== SnackBarType.Success) this.snackBarRef = snackBarRef;
  }

  private getTitleKey(type: SnackBarType, status?: number, networkError?: boolean) {
    switch (type) {
      case SnackBarType.Success:
        return 'common.success';
      case SnackBarType.Warning:
        return 'common.warning';
      case SnackBarType.Danger:
        return this.apiErrorTitleKey(status, networkError);
      default:
        return '';
    }
  }

  private apiErrorTitleKey(status: number, networkError: boolean) {
    if (networkError) {
      return 'apiMessages.errorMessages.connectivityErrorMessage';
    }
    switch (status) {
      case 400:
        return 'common.validationError';
      case 500:
        return 'common.serverError';
      case 0:
      case 503:
      case 504:
        return 'common.gatewayError';
      default:
        return 'common.httpError';
    }
  }
}