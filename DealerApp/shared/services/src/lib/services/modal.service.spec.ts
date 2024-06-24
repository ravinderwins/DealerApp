import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalService } from './modal.service';
import { MockDialogService } from '../testing';
import { ComponentType } from '@angular/cdk/portal';

class DemoComponent {
  constructor(){}
}

describe('ModalService', () => {
  let service: ModalService;
  let dialog: MatDialog;
  let dialogRef: MatDialogRef<ModalService>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      providers: [ 
        { provide: MatDialog, useValue: MockDialogService },
        { provide: MatDialogRef, useValue: MockDialogService },

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    service = TestBed.inject(ModalService);
    dialog = TestBed.inject(MatDialog);
    dialogRef = TestBed.inject(MatDialogRef);

  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should handle open method', ()=>{
    const data = {
      title: 'Confirmation modal',
      message: 'Hello'
    };
    const spyDialogOpen = jest.spyOn(dialog, 'open');
    service.open(DemoComponent, data)
    expect(spyDialogOpen).toHaveBeenCalled();
  });
  it('close method is called', () => {
    service.dialogRef = dialogRef;
    const spy = jest.spyOn(dialogRef, 'close');
    service.close(true);
    expect(spy).toHaveBeenCalled();
  });

  it('should call close is called', () => {
    const spy = jest.spyOn(dialogRef, 'close');
    service.close();
    expect(spy).toHaveBeenCalled();
  });
  
  it('should handle open method', ()=>{
    const data = {
      title: 'Confirmation modal',
      message: 'Hello'
    };
    const spyDialogOpen = jest.spyOn(dialog, 'open');
    service.openDeleteDialog(DemoComponent, data)
    expect(spyDialogOpen).toHaveBeenCalled();
  });

});
