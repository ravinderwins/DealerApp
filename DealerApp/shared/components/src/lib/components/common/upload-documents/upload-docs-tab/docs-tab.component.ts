import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-docs-tab',
  templateUrl: './docs-tab.component.html',
})
export class DocsTabComponent {
  isActiveUsersListView = true;
  @Output() tabChange = new EventEmitter<boolean>();

  changeTab(activeUsersView: boolean) {
    this.tabChange.emit(activeUsersView);
    this.isActiveUsersListView = activeUsersView;
  }
}
