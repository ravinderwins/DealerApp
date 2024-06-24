import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadedDocumentsComponent } from './uploaded-documents.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('UploadedDocumentsComponent', () => {
  let component: UploadedDocumentsComponent;
  let fixture: ComponentFixture<UploadedDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadedDocumentsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
