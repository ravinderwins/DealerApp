import { Injectable } from '@angular/core';
import {  MatDialog,  MatDialogRef } from '@angular/material/dialog';
import { CanDeactivate } from '@angular/router';
import { EventService, StorageService } from '@app/shared/services';
import { DirtyConfirmationDialogComponent } from '@app/shared/ui';
import { StorageKeys } from '@app/shared/utils';
import { AppFacade } from '@app/store/app';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class DirtyCheckGuard implements CanDeactivate<any> {
  confirmDialog: MatDialogRef<DirtyConfirmationDialogComponent>;

  constructor(private dialog: MatDialog, private storageService: StorageService, private eventService: EventService,private appFacade :AppFacade) {}

  canDeactivate(_component: any): Observable<boolean> | boolean {
    const subject = new Subject<boolean>();
    this.eventService.restrictAutoSaveObservable.next(true);
    const dirty = this.storageService.get(StorageKeys.FormDirty, true);
    if (dirty?.toUpperCase() == 'TRUE') {
      this.eventService.formErrorsObservable.next();
      this.confirmDialog = this.dialog.open(DirtyConfirmationDialogComponent, { data: dirty, disableClose: true, panelClass: 'modal-sm' });
      this.confirmDialog.componentInstance.subject = subject;
      this.confirmDialog.afterClosed().subscribe((response) => {
        if (response) {
          this.eventService.dirtyGuardEventObservable.next(true);
        }else{
          this.eventService.restrictAutoSaveObservable.next(response);
        }
      });
      const result = subject.asObservable();
      return result;
    }

    this.eventService.dirtyGuardEventObservable.next(true);
    return true;
  }
}
