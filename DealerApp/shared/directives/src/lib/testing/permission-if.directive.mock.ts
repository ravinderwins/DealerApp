import { Directive, Input } from '@angular/core';
import { AppPermission } from '../enums';

@Directive({
  selector: '[permissionIf]',
})
export class MockPermissionIfDirective {
  @Input() set permissionIf(permission: AppPermission) {
    this.isGranted(permission);
  }  
  private isGranted(_permission: AppPermission) {
    // check permission is granted
  }
}
