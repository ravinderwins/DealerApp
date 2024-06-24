import { Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { Note, NoteDetails } from '@app/entities';
import { Subscription } from 'rxjs';
import { NotesFooterComponent } from './notes-footer/notes-footer.component';

export interface GroupedNotesByDate {
  notes: NoteDetails[];
  date: Date;
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnDestroy {
  @ViewChild('footerComponent', { static: false }) component: NotesFooterComponent;
  @Input() notes: GroupedNotesByDate[];
  @Input() disabled = false;
  @Output() search = new EventEmitter<Note>();
  @Output() save = new EventEmitter<Note>();
  @Output() update = new EventEmitter<Note>();

  subscription = new Subscription();

  constructor() {
    this.addNotesClass();
  }

  searchNote(note: Note) {
    this.component.form.resetForm();
    this.search.emit(note);
  }

  saveNote(payload: Note) {
    this.save.emit({ ...payload });
    this.scrollTop();
  }

  updateNote(note: Note) {
    this.update.emit(note);
  }
 
  addNotesClass() {
    const container = document.querySelector('.body-scroll');
    container?.classList?.add('notes-tab');
  }

  removeNotesClass() {
    const container = document.querySelector('.body-scroll');
    container?.classList?.remove('notes-tab');
  }

  scrollTop() {
    const firstInvalidControl: HTMLElement = document.querySelector('.note-content');
    if (firstInvalidControl) {
      firstInvalidControl?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      (firstInvalidControl.querySelector('input, mat-select,select') as HTMLElement)?.focus();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.removeNotesClass();
  }
}
