import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { AdminPermission, Permission } from '@app/entities';

interface Control {
    readonlyControl?: boolean;
    disableControl?: boolean;
    disabled?: boolean;
  }

@Directive({
  selector: '[permissionIsGranted]',
})
export class MockPermissionDirective {
  @Input() control?: Control;
  @Input() addDeniedClass = true;

  @Input()permissionIsGranted: Permissions | AdminPermission;


  @Input() permissions: (Permission | AdminPermission)[];
  @Output() clicked = new EventEmitter();
}
