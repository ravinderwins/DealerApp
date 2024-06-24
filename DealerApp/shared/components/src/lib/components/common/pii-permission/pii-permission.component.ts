import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Permission } from '@app/entities';
import { EventService } from '@app/shared/services';
import { PermissionService } from '@app/store/user';

@Component({
  selector: 'app-pii-permission',
  templateUrl: './pii-permission.component.html',
  styleUrls: ['./pii-permission.component.scss'],
})
export class PiiPermissionComponent implements OnInit {
  @Output() clicked = new EventEmitter<boolean>();
  readonly AvailablePermissions = Permission;
  isViewfullPII: boolean;
  unmask = false;
  constructor(private permissionService: PermissionService, public eventService: EventService, private router: Router) {
    this.eventService.resetMaskingObservable$.subscribe(() => {
      this.unmask = false;
    });
  }

  ngOnInit(): void {
    this.isViewfullPII = this.permissionService.permissionIsGranted(this.AvailablePermissions.ViewFullPII);
  }

  toggle() {
    this.unmask = !this.unmask;
    this.eventService.togglePIIObservable.next([this.unmask,this.isViewfullPII]);
  }

  get hide() {
    return this.router.url.includes('/new');
  }

  get label() {
    return this.unmask ? 'common.hidePII' : 'common.viewPII';
  }
}
