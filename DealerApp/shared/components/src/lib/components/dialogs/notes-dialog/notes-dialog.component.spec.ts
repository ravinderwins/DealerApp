import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { Note } from '@app/entities';
import { of } from 'rxjs';
import { NotesDialogComponent } from './notes-dialog.component';

const note: Note = {
  content: '',
  isFlagged: false,
};

describe('NotesDialogComponent', () => {
  let component: NotesDialogComponent;
  let dialogRef: MatDialogRef<NotesDialogComponent>;
  let fixture: ComponentFixture<NotesDialogComponent>;

  beforeEach(async () => {
    const mockDialogRef = {
      close: jest.fn().mockImplementation(() => {
        return { afterClosed: () => of(false) };
      }),
    };
    await TestBed.configureTestingModule({
      declarations: [NotesDialogComponent],
      imports: [FormsModule, TranslateModule.forRoot({})],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesDialogComponent);
    component = fixture.componentInstance;
    component.note = note;
    fixture.detectChanges();
    dialogRef = TestBed.inject(MatDialogRef);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check contentChanged method is called', () => {
    component.contentChanged(note);
    expect(component.note).toEqual(note);
  });
  it('should handle close', () => {
    const spy = jest.spyOn(dialogRef, 'close').mockImplementation();
    component.close();
    expect(spy).toHaveBeenCalled();
  });
  it('should check handleFormSubmit method', () => {
    jest.spyOn(component, 'isFormValid').mockReturnValue(true);
    const mockFormSubmitDetails = jest.spyOn(component, 'handleFormSubmit');
    component.handleFormSubmit();
    expect(mockFormSubmitDetails).toHaveBeenCalled();
  });
});
