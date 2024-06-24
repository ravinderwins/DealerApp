import { Component, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialogComponent } from '@app/base';
import { Note } from '@app/entities';

@Component({
  selector: 'app-notes-dialog',
  templateUrl: './notes-dialog.component.html',
  styleUrls: ['./notes-dialog.component.scss'],
})
export class NotesDialogComponent extends BaseDialogComponent {
  @ViewChild('form', { static: false }) override form: NgForm;

  note = new Note();

  constructor(public override dialogRef: MatDialogRef<NotesDialogComponent>, @Inject(MAT_DIALOG_DATA) public dealId: number) {
    super();
  }

  override close(result?: Note) {
    this.dialogRef.close(result);
  }

  contentChanged(note: Note) {
    this.note = note;
  }

  override handleFormSubmit() {
    const valid = this.note.content && this.form.valid;
    if (valid) {
      this.close({ ...this.note, dealId: this.dealId });
      this.note = new Note();
      this.form.resetForm();
    }
  }
}
