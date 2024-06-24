import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { DmsImportDeal, GridColumn, Provider, SortDirection } from '@app/entities';
import { UtilityService } from '@app/shared/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dms-deal-grid',
  templateUrl: './dms-deal-grid.component.html',
  styleUrls: ['./dms-deal-grid.component.scss'],
})
export class DmsDealGridComponent implements OnInit {
  @ViewChild('actionColumn', { static: false }) actionColumn?: TemplateRef<HTMLElement>;
  @Input() deals$: Observable<DmsImportDeal[]>;
  @Input() provider: Provider;
  @Input() loaded: boolean;
  @Input() isDmsRefresh = false;

  @Output() dmsDealAction = new EventEmitter<DmsImportDeal>();

  readonly defaultSortColumn = 'productName';
  readonly defaultSortDirection = SortDirection.Ascending;

  activeColumns: Array<GridColumn>;

  constructor(private utilityService: UtilityService) { }
  ngOnInit(): void {
    this.activeColumns = [
      {
        name: 'dealNo',
        displayName: 'dealManagement.dmsSearch.dealId',
        sort: false,
        tooltip: true,
        columnClass: 'small-column',
      },
      {
        name: 'primaryCustomerName',
        displayName: 'dealManagement.dmsSearch.customer',
        sort: true,
        columnClass: 'ellipsis',
      },
      {
        name: 'vin',
        displayName: 'dealManagement.dmsSearch.vin',
        sort: false,
        tooltip: true,
        columnClass: 'ellipsis',
      },
      {
        name: 'unit',
        displayName: 'dealManagement.dmsSearch.unit',
        sort: true,
        tooltip: true,
        columnClass: 'ellipsis',
      },
      {
        name: 'amountFinanced',
        displayName: 'dealManagement.dmsSearch.amount',
        sort: false,
        tooltip: true,
        columnClass: 'text-right medium-column',
        formatValue: (value) => {
          return this.utilityService.formatAmount(value.amountFinanced);
        },
      },
      {
        name: 'action',
        displayName: 'dealManagement.dmsSearch.' + (this.isDmsRefresh ? 'refresh' : 'import'),
        sort: false,
        columnClass: 'small-column',
        template: () => this.actionColumn,
      },
    ];
  }

  importDeal(deal: DmsImportDeal) {
    this.dmsDealAction.emit(deal);
  }
}
