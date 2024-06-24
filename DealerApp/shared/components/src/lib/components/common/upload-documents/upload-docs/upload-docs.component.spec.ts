import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadFileDetails } from '@app/entities';
import { TranslateModule } from '@ngx-translate/core';
import { UploadDocsComponent } from './upload-docs.component';

const MockFileData: UploadFileDetails[] = [
  {
    lastModified: 1,
    lastModifiedDate: new Date(),
    name: 'Tim Martin',
    size: 12225,
    type: 'Credit App',
    webkitRelativePath: '',
    imageUrl: '',
  },
];

describe('UploadDocsComponent', () => {
  let component: UploadDocsComponent;
  let fixture: ComponentFixture<UploadDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadDocsComponent],
      imports: [TranslateModule.forRoot({})],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('prepareFilesList', () => {
    it('should prepareFilesList', () => {
      const spy = jest.spyOn(component.upload, 'emit');
      component.prepareFilesList(MockFileData);
      expect(spy).toHaveBeenCalled();
    });
  
    it('should prepareFilesList', () => {
      component.multiple = true;
      const spy = jest.spyOn(component.upload, 'emit');
      component.prepareFilesList(MockFileData);
      expect(spy).toHaveBeenCalled();
    });
  });
  
  it('should fileBrowseHandler', () => {
    const event = {
      target: {
        files: [],
      },
    };
    const spy = jest.spyOn(component, 'prepareFilesList');
    component.fileBrowseHandler(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should onFileDropped', () => {
    const spy = jest.spyOn(component, 'prepareFilesList');
    component.onFileDropped(MockFileData);
    expect(spy).toHaveBeenCalled();
  });
});
