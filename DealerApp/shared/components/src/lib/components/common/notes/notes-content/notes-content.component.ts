import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '@app/entities';
import { GroupedNotesByDate } from '../notes.component';

@Component({
  selector: 'app-notes-content',
  templateUrl: './notes-content.component.html',
  styleUrls: ['./notes-content.component.scss'],
})
export class NotesContentComponent {
  @Input() notes: GroupedNotesByDate[];
  @Output() updateNote = new EventEmitter<Note>();

  update(note: Note) {
    const payload = { ...note, isFlagged: !note.isFlagged };
    this.updateNote.emit(payload);
  }
}
