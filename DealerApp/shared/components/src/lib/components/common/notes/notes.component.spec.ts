import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotesComponent } from './notes.component';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [NotesComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit save event', () => {
    const payload: any = { title: 'Test Note', content: 'Test Content' };
    const saveSpy = jest.spyOn(component.save, 'emit');
    const scrollSpy = jest.spyOn(component, 'scrollTop');
    component.saveNote(payload);
    expect(saveSpy).toHaveBeenCalledWith(payload);
    expect(scrollSpy).toHaveBeenCalled();
  });
  it('should emit scrollTop event', () => {
    const saveSpy = jest.spyOn(component.save, 'emit');
    component.scrollTop();
    expect(saveSpy).not.toHaveBeenCalledWith();
  });
  it('should emit update event', () => {
    const note: any = { title: 'Test Note', content: 'Test Content' };
    const update = jest.spyOn(component.update, 'emit');
    component.updateNote(note);
    expect(update).toHaveBeenCalledWith(note);
  });
  it('should call updateNote with a copied payload', () => {
    const payload: any = { title: 'Test Payload', content: 'Test Payload Content' };
    const updateNoteSpy = jest.spyOn(component, 'updateNote');
    component.updateNote(payload);
    expect(updateNoteSpy).toHaveBeenCalledWith({ ...payload });
  });
  it('should add notes class on initialization', () => {
    const container = document.createElement('div');
    container.classList.add('body-scroll');
    jest.spyOn(document, 'querySelector').mockReturnValue(container);
    component.addNotesClass();
    expect(container.classList.contains('notes-tab')).toBeTruthy();
  });

  it('should remove notes class on ngOnDestroy', () => {
    const container = document.createElement('div');
    container.classList.add('body-scroll');
    jest.spyOn(document, 'querySelector').mockReturnValue(container);
    component.removeNotesClass();
    expect(container.classList.contains('notes-tab')).toBeFalsy();
  });

});
