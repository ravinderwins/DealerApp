import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CanDeactivate } from '@angular/router';
import { EventService, StorageService } from '@app/shared/services';
import { StorageKeys } from '@app/shared/utils';
import { MissingRequiredConfirmationDialogComponent } from '@app/shared/ui';
import { Observable, Subject, Subscription } from 'rxjs';

@Injectable()
export class DirtyValidCheckGuard implements CanDeactivate<any>, OnDestroy {
  private subscription = new Subscription();
  private confirmDialog: MatDialogRef<MissingRequiredConfirmationDialogComponent>;

  constructor(private dialog: MatDialog, private storageService: StorageService, private eventService: EventService) {}

  canDeactivate(_component: any): Observable<boolean> | boolean {
    const subject = new Subject<boolean>();

    const invalid = this.storageService.get(StorageKeys.FormInvalid, true);
    const dirty = this.storageService.get(StorageKeys.FormDirty, true);
    if (invalid?.toUpperCase() == 'TRUE') {
      this.eventService.formErrorsObservable.next();
      this.confirmDialog = this.dialog.open(MissingRequiredConfirmationDialogComponent, { data: dirty, disableClose: true, panelClass: 'modal-sm' });
      this.confirmDialog.componentInstance.subject = subject;
      this.subscription.add(
        this.confirmDialog.afterClosed().subscribe((response) => {
          if (response) {
            this.eventService.dirtyGuardEventObservable.next(true);
          }
        })
      );
      const result = subject.asObservable();
      return result;
    }

    this.eventService.dirtyGuardEventObservable.next(false);
    return true;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
