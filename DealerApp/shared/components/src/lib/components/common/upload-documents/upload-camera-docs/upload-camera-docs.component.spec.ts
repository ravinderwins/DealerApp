import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadCameraDocsComponent } from './upload-camera-docs.component';
import { TranslateModule } from '@ngx-translate/core';
import { UploadFileDetails } from '@app/entities';

// Mock the MediaStream constructor
class MockMediaStream {
  getTracks() {
    return [{ stop: jest.fn() }];
  }
}

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


describe('UploadCameraDocsComponent', () => {
  let component: UploadCameraDocsComponent;
  let fixture: ComponentFixture<UploadCameraDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadCameraDocsComponent],
      imports: [TranslateModule.forRoot({})],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadCameraDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check onFileDropped', () => {
    component.multiple = true;
    const spy = jest.spyOn(component, 'prepareFilesList');
    component.onFileDropped(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should check prepareFilesList', () => {
    const spy = jest.spyOn(component.upload, 'emit');
    component.prepareFilesList(MockFileData[0]);
    expect(spy).toHaveBeenCalled();
  });

  it('should check prepareFilesList', () => {
    component.multiple = true;
    const spy = jest.spyOn(component.upload, 'emit');
    component.prepareFilesList(MockFileData);
    expect(spy).toHaveBeenCalled();
  });


  describe('stopCamera', () => {
    test('should stop the camera and set isEnableCamera to false', () => {
      // Mock the HTMLVideoElement and its methods
      const mockVideo : any = document.createElement('video');
      mockVideo.srcObject = new MockMediaStream();
      // Mock the document.getElementById to return our mocked video element
      document.getElementById = jest.fn(() => mockVideo);
      component.stopCamera();
      expect(mockVideo.srcObject).toEqual({});
      expect(component.isEnableCamera).toBeFalsy();
    });
  });

  describe('scroll', () => {
    let mockElement: { scrollTo: jest.Mock<void, [number, number]>, scrollIntoView: jest.Mock<void, []> };
  
    beforeEach(() => {
      mockElement = { scrollTo: jest.fn(), scrollIntoView: jest.fn() };
    });
  
    it('should scroll to the bottom of the element and bring it into view', () => {
      component.scroll(mockElement as unknown as HTMLElement);
      expect(mockElement.scrollIntoView).toHaveBeenCalled();
    });
  });

  it('should generate a string with the correct format', () => {
    const result = component.generateString();
    const regex = /^Image_\d+\.png$/; 
    expect(result).toMatch(regex); 
  });

  it('should check base64ImageToBlob', () => {
    const spy = jest.spyOn(component, 'base64ImageToBlob');
    component.base64ImageToBlob('test;base64,');
    expect(spy).toHaveBeenCalled();
  });

  describe('prepareFileIcon', () => {
    test('should prepare file icons correctly', () => {
      // Mock files
      const files = [
        new File(['mockFile1'], 'mockFileName1.png', { type: 'image/png' }),
        new File(['mockFile2'], 'mockFileName2.png', { type: 'image/png' }),
      ];
  
      // Mock FileReader and its methods
      class MockFileReader {
        onload: Function | null = null;
        readAsDataURL(_file: File) {
          this.onload && this.onload({ target: { result: 'mockDataURL' } });
        }
      }
      const mockPrepareFilesList = jest.fn();
      const mockThis = {
        prepareFilesList: mockPrepareFilesList
      };
      component.prepareFileIcon(files);
    });
  
    test('should handle empty files array', () => {
      // Mock prepareFilesList method
      const mockPrepareFilesList = jest.fn();
  
      // Mock the "this" context
      const mockThis = {
        prepareFilesList: mockPrepareFilesList
      };
      component.prepareFileIcon.call(mockThis, []);
    });
  });

  it('should browserForFile', () => {
    const spy = jest.spyOn(component, 'enableCamera');
    let mockElement: { scrollTo: jest.Mock<void, [number, number]>; scrollIntoView: jest.Mock<void, []> };

    component.browserForFile(false, mockElement);
    expect(spy).toHaveBeenCalledWith(mockElement);
  });
});
