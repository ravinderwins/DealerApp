import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from '@app/entities';

@Component({
  selector: 'app-notes-footer',
  templateUrl: './notes-footer.component.html',
  styleUrls: ['./notes-footer.component.scss']
})
export class NotesFooterComponent {

  @ViewChild('form', { static: false }) form: NgForm;
  @Output() saved = new EventEmitter<Note>();

  note: Note = {
    content: '',
    isFlagged: false
  };

  contentChanged(note: Note) {
    this.note = note;
  }

  saveNote() {
    const valid = this.note.content && this.form.valid;
    if (valid) {
      this.saved.emit(this.note);
      this.note = new Note();
      this.form.resetForm();
    }
  }
}
