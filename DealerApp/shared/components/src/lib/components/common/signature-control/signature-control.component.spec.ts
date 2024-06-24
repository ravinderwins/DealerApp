import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { ThirdPartyTestingRootModule } from '@app/shared/testing';
import { SignatureControlComponent } from './signature-control.component';

describe('SignatureControlComponent', () => {
  let component: SignatureControlComponent;
  let fixture: ComponentFixture<SignatureControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignatureControlComponent],
      imports: [
        ThirdPartyTestingRootModule,
        StoreModule.forRoot({})
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignatureControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('changeType Method is called', () => {
    const spy = jest.spyOn(component.signatureBase64, 'emit');
    component.changeType(true);
    expect(spy).toHaveBeenCalled();
  });
  it('emitSignature Method is called', () => {
    const payload = {
      signatureBase64: '',
    };
    const spy = jest.spyOn(component.signatureBase64, 'emit');
    component.emitSignature(payload,true);
    expect(spy).toHaveBeenCalled();
  });
});
