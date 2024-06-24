import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Note } from '@app/entities';
import { UtilityService } from '@app/shared/services';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-notes-header',
  templateUrl: './notes-header.component.html',
  styleUrls: ['./notes-header.component.scss'],
})
export class NotesHeaderComponent implements OnInit, OnDestroy {
  @Output() searchNote = new EventEmitter<Note>();
  filter = new Note();
  isFlagged = false;
  searchBounce = new Subject<string>();
  private subscription = new Subscription();

  constructor(private utilityService: UtilityService){}
  ngOnInit(): void {
    this.subscription.add(
      this.searchBounce.pipe(debounceTime(1000), distinctUntilChanged()).subscribe((value) => {
        this.filter.searchText = value;
        this.preformSearch();
      })
    );
  }

  toggleFlag() {
    this.isFlagged = !this.isFlagged;
    this.preformSearch();
  }

  preformSearch() {
    this.searchNote.emit({ ...this.filter, isFlagged: this.isFlagged ? true : null });
  }

  preventSpace(event) {
    this.utilityService.preventSpace(event);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
