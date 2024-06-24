import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MockUtilityService, UtilityService } from '@app/shared/services';
import { NotesHeaderComponent } from './notes-header.component';

describe('NotesHeaderComponent', () => {
  let component: NotesHeaderComponent;
  let fixture: ComponentFixture<NotesHeaderComponent>;
  let utilityService: UtilityService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotesHeaderComponent],
      imports: [TranslateModule.forRoot({}), FormsModule],
      providers: [{ provide: UtilityService, useValue: MockUtilityService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    utilityService = TestBed.inject(UtilityService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit searchNote event on performSearch()', () => {
    const searchNoteSpy = jest.spyOn(component.searchNote, 'emit');
    component.filter.searchText = 'example';
    component.isFlagged = true;
    component.preformSearch();
    expect(searchNoteSpy).toHaveBeenCalledWith({ searchText: 'example', isFlagged: true,refresh:false });
  });

  it('should handle preventSpace method ', () => {
    const value = 'Space';
    const spyPreventSpace = jest.spyOn(utilityService, 'preventSpace');
    component.preventSpace(value);
    expect(spyPreventSpace).toHaveBeenCalled();
    expect(spyPreventSpace).toHaveBeenCalledWith(value);
  });

  it('should toggle isFlagged property on toggleFlag()', () => {
    const searchNoteSpy = jest.spyOn(component.searchNote, 'emit');
    component.isFlagged = false;
    component.toggleFlag();
    expect(searchNoteSpy).toHaveBeenCalled();
    expect(component.isFlagged).toBe(true);
  });

});
