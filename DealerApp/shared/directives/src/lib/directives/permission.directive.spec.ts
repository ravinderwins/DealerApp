import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Permission } from '@app/entities';
import { AppPermission } from '../enums';
import { PermissionDirective } from './permission.directive';
import { PermissionService } from '@app/store/user';

@Component({
  template: `
    <button #buttonControl [permissions]="permissions" [permissionIsGranted]="Permission" [control]="buttonControl" (clicked)="onClick($event)">Test Button</button>
  `,
})
class TestPermissionComponent {
  permission = Permission.UpdateDeal;
  permissions: AppPermission[] = [Permission.UpdateDeal, Permission.ViewDeals];
}

describe('PermissionDirective', () => {
  let directive: PermissionDirective;
  let permissionService: PermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PermissionDirective, TestPermissionComponent],
      providers: [PermissionDirective, { provide: PermissionService, useValue: { permissionIsGranted: jest.fn() } }],
    });
    directive = TestBed.inject(PermissionDirective);
    permissionService = TestBed.inject(PermissionService);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should disable the control if permission is not granted', () => {
    directive.control = { disableControl: false, disabled: false, readonlyControl: false };
    directive.permissions = [];
    jest.spyOn(permissionService, 'permissionIsGranted').mockReturnValue(false);
    directive.disableControl();
    expect(directive.control.disableControl).toBeTruthy();
    expect(directive.control.disabled).toBeTruthy();
    expect(directive.control.readonlyControl).toBeFalsy();
    expect(directive.elementClass).toBe('permissionDenied');
  });

  it('should not disable the control if permission is granted', () => {
    directive.control = { disableControl: false, disabled: false, readonlyControl: false };
    directive.disableControl();
    expect(directive.control.disableControl).toBeFalsy();
    expect(directive.control.disabled).toBeFalsy();
    expect(directive.control.readonlyControl).toBeFalsy();
    expect(directive.elementClass).toBe('allowPermission');
  });

  it('should prevent default and stop propagation if permission is not granted', () => {
    const event = { preventDefault: jest.fn(), stopPropagation: jest.fn() };
    jest.spyOn(permissionService, 'permissionIsGranted').mockReturnValue(false);
    directive.handleClick(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
  });
});
