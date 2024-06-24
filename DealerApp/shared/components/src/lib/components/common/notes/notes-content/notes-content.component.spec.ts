import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesContentComponent } from './notes-content.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('NotesContentComponent', () => {
  let component: NotesContentComponent;
  let fixture: ComponentFixture<NotesContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotesContentComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the updated neote when update method is called', () => {
    const note = { id: 1, content: 'Test note', isFlagged: false };
    const updatedNote = { ...note, isFlagged: true };
    const expectedPayload = updatedNote;
    let emittedPayload: any;
    component.updateNote.subscribe((payload: any) => {
      emittedPayload = payload;
    });
    component.update(note);
    expect(emittedPayload).toEqual(expectedPayload);
  });
});
