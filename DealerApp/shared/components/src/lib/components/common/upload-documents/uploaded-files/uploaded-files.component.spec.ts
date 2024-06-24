import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadedFilesComponent } from './uploaded-files.component';
import { UploadFileDetails } from 'libs/entities/src/lib/models';
import { TranslateModule } from '@ngx-translate/core';

const MockFileData: UploadFileDetails[] =[{
  lastModified: 1,
  lastModifiedDate: new Date,
  name: 'Test',
  size: 12225,
  type: 'Credit App',
  webkitRelativePath: '',
  imageUrl: '',
}];

describe('UploadedFilesComponent', () => {
  let component: UploadedFilesComponent;
  let fixture: ComponentFixture<UploadedFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadedFilesComponent],
      imports: [TranslateModule.forRoot({})]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadedFilesComponent);
    component = fixture.componentInstance;
    component.files = MockFileData
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should deleteFile', () => {
    const spy = jest.spyOn(component.delete, 'emit');
    component.deleteFile(1);
    expect(spy).toHaveBeenCalled();
  });
});
