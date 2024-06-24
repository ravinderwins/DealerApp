import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesFooterComponent } from './notes-footer.component';
import { FormsModule } from '@angular/forms';
import { ThirdPartyTestingRootModule } from '@app/shared/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Note } from '@app/entities';

describe('NotesFooterComponent', () => {
  let component: NotesFooterComponent;
  let fixture: ComponentFixture<NotesFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesFooterComponent ],
      imports: [ThirdPartyTestingRootModule, FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should emit saved event when saveNote is called with a valid note', () => {
    const emittedNote: any = { content: 'Test note', isFlagged: false };
    const savedEmitterSpy = jest.spyOn(component.saved, 'emit');

    component.note = emittedNote;
    component.form = { valid: true, resetForm: jest.fn() } as any;
    component.saveNote();

    expect(savedEmitterSpy).toHaveBeenCalledWith(emittedNote);
    expect(component.note).toEqual(new Note());
    expect(component.form.resetForm).toHaveBeenCalled();
  });

  it('should not emit saved event when saveNote is called with an invalid note', () => {
    const savedEmitterSpy = jest.spyOn(component.saved, 'emit');
    component.note = { content: '', isFlagged: false };
    component.form = { valid: false, resetForm: jest.fn() } as any;
    component.saveNote();
    expect(savedEmitterSpy).not.toHaveBeenCalled();
    expect(component.note).toEqual({ content: '', isFlagged: false });
    expect(component.form.resetForm).not.toHaveBeenCalled();
  });

  it('should update the note when contentChanged is called', () => {
    const newNote: Note = { content: 'New content', isFlagged: false };
    component.contentChanged(newNote);
    expect(component.note).toEqual(newNote);
  });
});
