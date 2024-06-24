import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadDocSectionComponent } from './upload-doc-section.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

describe('UploadDocSectionComponent', () => {
  let component: UploadDocSectionComponent;
  let fixture: ComponentFixture<UploadDocSectionComponent>;
  let mockReader: FileReader;
  let mockFile: File;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadDocSectionComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [TranslateModule.forRoot({})]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDocSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockReader = {
      readAsDataURL: jest.fn(),
      onload: Event,
      result: 'mockImageData' // Mocking result for onload event
    } as any;

    mockFile = new File(['fileContent'], 'fileName', { type: 'image/png' });
    jest.spyOn(window, 'FileReader').mockImplementation(() => mockReader);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
