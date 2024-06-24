import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { EventService, MockEventService } from '@app/shared/services';
import { MockRouterService } from '@app/shared/testing';
import { MockPermissionService, PermissionService } from '@app/store/user';
import { PiiPermissionComponent } from './pii-permission.component';

describe('PiiPermissionComponent', () => {
  let component: PiiPermissionComponent;
  let fixture: ComponentFixture<PiiPermissionComponent>;
  let eventService: EventService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PiiPermissionComponent],
      imports: [TranslateModule.forRoot({}), MatTooltipModule],
      providers: [
        { provide: PermissionService, useValue: MockPermissionService },
        { provide: EventService, useValue: MockEventService },
        { provide: Router, useValue: MockRouterService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiiPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    eventService = TestBed.inject(EventService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle onClick', () => {
    const spyMockLogoutEvent = jest.spyOn(eventService.togglePIIObservable, 'next');
    component.toggle();
    expect(spyMockLogoutEvent).toHaveBeenCalled();
  });
  it('should handle onClick', () => {
    const hideStepArrow = component.hide;
    expect(hideStepArrow).toBe(false);
  });
});
