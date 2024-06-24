import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ConfirmationDialogData } from '@app/entities';
import { LoaderService, ModalService } from '@app/shared/services';
import { ConfirmationDialogComponent, CustomConfirmationDialogComponent } from '@app/shared/ui';
import { UserFacade } from '@app/store/user';
import { catchError, concatMap, finalize, map, of, tap, withLatestFrom } from 'rxjs';
import { DmsImportService } from '../services/dms-import.service';
import * as DmsImportActions from './dms-import.actions';
import { DmsImportFacade } from './dms-import.facade';

@Injectable()
export class DmsImportEffects {
  searchDeal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DmsImportActions.searchDeal),
      map((action) => action.data),
      withLatestFrom(this.userFacade.currentOrgId$, this.dmsImportFacade.loaded$),
      concatMap(([data, orgId, loaded]) => {
        if (loaded) this.dmsImportFacade.refresh();
        return this.dmsImportService.searchDeal(data, orgId).pipe(
          map((res) => DmsImportActions.searchDealSuccess({ data: res })),
          catchError(() => of(DmsImportActions.searchDealFailure()))
        );
      })
    )
  );

  dealImport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DmsImportActions.dealImport),
      map((action) => action.data),
      withLatestFrom(this.userFacade.currentOrgId$),
      concatMap(([payload, orgId]) => {
        this.loaderService.showSpinner();
        return this.dmsImportService.dealImport(orgId, payload).pipe(
          map((id) => {
            const dealId = id || payload.dealId;
            this.router.navigateByUrl(`/deals/${dealId}/customers`);
            return DmsImportActions.updateReimported({ data: false });
          }),
          catchError(() => {
            return of(DmsImportActions.dealImportFailure());
          }),
          finalize(() => {
            this.loaderService.hideSpinner();
          })
        );
      })
    )
  );

  // Duplicate check to verify Deal is already imported or not
  checkDuplicateImport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DmsImportActions.checkDuplicateImport),
      map((action) => action.data),
      withLatestFrom(this.userFacade.currentOrgId$),
      concatMap(([payload, orgId]) => {
        const { importId, providerCode } = payload;

        this.loaderService.showSpinner();

        return this.dmsImportService.checkDuplicateImport(orgId, providerCode, importId).pipe(
          map((dealId) => {
            // Already Imported Deal Exist
            return DmsImportActions.checkDuplicateImportSuccess({ data: { ...payload, alreadyImportedDeal: dealId } });
          }),
          catchError(() => {
            // No Duplicate Imported Deal Exist
            return of(DmsImportActions.checkDuplicateImportFailure({ data: { ...payload } }));
          }),
          finalize(() => {
            this.loaderService.hideSpinner();
          })
        );
      })
    )
  );

  // Handling Confirmation Dialog After Duplicate Check
  handleConfirmationDialog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DmsImportActions.checkDuplicateImportSuccess, DmsImportActions.checkDuplicateImportFailure),
      map((action) => action.data),
      tap((payload) => {
        const { dealId, dealNo, providerCode, alreadyImportedDeal } = payload;

        let titleReplacementObj: object, title: string, text: string, instructions: string[] = [];

        // DMS Refresh Scenario
        if (dealId) {
          title = 'deal.dmsRefresh.confirmationMessage';
          text = 'deal.dmsRefresh.instructions.title';
          instructions = [
            'deal.dmsRefresh.instructions.unit',
            'deal.dmsRefresh.instructions.partAccessories',
            'deal.dmsRefresh.instructions.worksheet',
            'deal.dmsRefresh.instructions.tradeIn',
            'deal.dmsRefresh.instructions.void'
          ];
          titleReplacementObj = { importedDealId: dealNo, dealId: dealId, };
        }

        if (alreadyImportedDeal) {
          // Already Imported Scenario for both (DMS Import or DMS Refresh)
          title = 'deal.dmsImport.checkDealConfirmationMessage';
          titleReplacementObj = { importedDealId: dealNo, dealId: alreadyImportedDeal };
        } else if (!dealId) {
          // DMS Import Scenario
          title = 'deal.dmsImport.confirmationMessage';
          titleReplacementObj = { importedDealId: dealNo, dmsProvider: providerCode };
        }

        const data: ConfirmationDialogData = {
          title,
          text,
          instructions,
          titleReplacementObj,
          button: {
            primaryButton: `common.${alreadyImportedDeal ? 'yes' : 'no'}`,
            secondaryButton: `common.${alreadyImportedDeal ? 'no': 'yes'}`,
          },
        };

        const dialogRef = this.modalService.open(alreadyImportedDeal ? ConfirmationDialogComponent : CustomConfirmationDialogComponent, data, 'modal-sm');
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.dmsImportFacade.dealImport(payload);
          }
          this.dmsImportFacade.updateReimported(false);
        });
      })
    ),
  { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private loaderService: LoaderService,
    private dmsImportService: DmsImportService,
    private userFacade: UserFacade,
    private router: Router,
    private dmsImportFacade: DmsImportFacade,
    private modalService: ModalService,
  ) { }
}
