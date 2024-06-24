import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogData } from '@app/entities';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public dialogRef?: MatDialogRef<any>;

  constructor(private dialog: MatDialog) {}

  open<T>(component: ComponentType<any>, data?: T, modalClass: (string | string[]) = 'modal-md', autoFocus = true, hasParentDialog = false) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = autoFocus;
    dialogConfig.panelClass = modalClass;
    dialogConfig.data = data;
    dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(component, dialogConfig);
    if (!hasParentDialog) this.dialogRef = dialogRef;

    return dialogRef;
  }

  close(value = true) {
    if (this.dialogRef) {
      this.dialogRef.close(value);
      this.dialogRef = undefined;
    }
  }

  openDeleteDialog<T>(component: ComponentType<any>, data: object, modalClass: string = 'modal-md', hasParentDialog = false) {
    const defaultData = {
      button: {
        primaryButton: 'common.deleteAction',
        secondaryButton: 'common.cancel',
      },
    };

    const combinedData = Object.assign({}, defaultData, data) as ConfirmationDialogData;
    return this.open(component, combinedData, modalClass, false, hasParentDialog);
  }
}
