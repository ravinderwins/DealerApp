import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { AdminPermission, Permission } from '@app/entities';
import { PermissionService } from '@app/store/user';

interface Control {
  readonlyControl?: boolean;
  disableControl?: boolean;
  disabled?: boolean;
}

@Directive({
  selector: '[permissionIsGranted]',
})
export class PermissionDirective {
  @Input() control?: Control;
  @Input() addDeniedClass = true;

  private _permissionIsGranted: Permission | AdminPermission;

  @Input()
  get permissionIsGranted() {
    return this._permissionIsGranted;
  }

  set permissionIsGranted(permission: Permission | AdminPermission) {
    this._permissionIsGranted = permission;
    this.disableControl();
  }

  @Input() permissions: (Permission | AdminPermission)[];
  @Output() clicked = new EventEmitter();

  @HostBinding('class') elementClass;

  @HostListener('click', ['$event'])
  handleClick(e) {
    if (this.isGranted()) {
      this.clicked.next(e);
    } else {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  constructor(private permissionService: PermissionService) {}

  private isGranted() {
    if (this.permissions) {
      return this.permissions.includes(this.permissionIsGranted);
    }

    return this.permissionService.permissionIsGranted(this.permissionIsGranted);
  }

  disableControl() {
    if (this.isGranted() == false) {
      if (this.control) {
        this.control.disableControl = true;
        this.control.disabled = true;
        this.control.readonlyControl = false;
      }
      this.elementClass = 'permissionDenied';
      if (!this.addDeniedClass) this.elementClass = 'allowPermission';
    } else {
      this.elementClass = 'allowPermission';
    }
  }
}
