import { Component, OnDestroy, OnInit } from '@angular/core';
import { DmsImportDeal, EntityType, Provider, ProviderCode, ProviderType } from '@app/entities';
import { DealImportRequest } from '../../model';
import { DmsSearch } from '../../model/dms-search.model';
import { DmsImportFacade } from '../../state/dms-import.facade';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalService } from '@app/shared/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dms-import-page',
  templateUrl: './dms-import-page.component.html',
  styleUrls: ['./dms-import-page.component.scss'],
})
export class DmsImportPageComponent implements OnInit, OnDestroy {
  deals$ = this.dmsImportFacade.deals$;
  loaded$ = this.dmsImportFacade.loaded$;

  readonly DMSProviderType = ProviderType.DMSCRM;
  readonly entityType = EntityType.Deal;

  subscription = new Subscription();
  dmsForm = new DmsSearch();
  provider: Provider;
  reImportedId: number;
  actionData: DmsImportDeal;
  dealId: number;
  customerName: string;

  constructor(private dmsImportFacade: DmsImportFacade,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.dealId = +this.activatedRoute.snapshot.paramMap.get('id');
    if (this.dealId) {
      this.activatedRoute.queryParams.subscribe((params: Params) => {
        this.customerName = params['CustomerName'];
        const secrchWithCustomerName = this.customerName.split(' ')[0];
        this.searchDeal(secrchWithCustomerName);
      });
    }
  }

  searchDeal(searchText: string) {
    if (this.dmsForm.searchText == searchText) return;
    if (!this.dmsForm.providerCode) this.dmsForm.providerCode = ProviderCode.Lightspeed;
    this.dmsForm = { ...this.dmsForm, searchText };
    if (this.dmsForm.searchText) {
      this.dmsImportFacade.searchDeal(this.dmsForm);
    }
  }

  providerSelection(event) {
    this.dmsForm.providerCode = event.code;
    this.provider = event;
  }

  dealImport() {
    const { dealNo, importId } = this.actionData;
    const payload: DealImportRequest = {
      providerCode: this.provider.code,
      importId: importId,
      dealId: this.dealId,
      dealNo: dealNo
    };
    this.dmsImportFacade.dealImport(payload);
  }

  dmsDealAction(data: DmsImportDeal) {
    const { importId, dealNo } = data;
    this.actionData = data;

    const payload: DealImportRequest = {
      providerCode: this.provider.code,
      importId: importId,
      dealId: this.dealId,
      dealNo: dealNo
    };

    this.dmsImportFacade.checkDuplicateImport(payload);
  }

  goBack() {
    const route = this.dealId ? `/deals/${this.dealId}/customers` : '/deals';
    this.router.navigateByUrl(route);
  }

  ngOnDestroy(): void {
    this.dmsImportFacade.resetEvent();
    this.subscription.unsubscribe();
  }
}
