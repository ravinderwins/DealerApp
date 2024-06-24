import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dms-search',
  templateUrl: './dms-search.component.html',
  styleUrls: ['./dms-search.component.scss'],
})
export class DmsSearchComponent {
  @Output() searchDmsDeal = new EventEmitter<string>();

  readonly pattern = '^[\\w\\-\\s]+$';
  @Input() searchText: string;
  @Input() dealId: number;

  constructor(private router: Router) {}

  searchDeal() {
    const searchText = this.searchText.trim();
    this.searchDmsDeal.emit(searchText);

    this.searchText = null;
    setTimeout(() => (this.searchText = searchText), 0);
  }
}
