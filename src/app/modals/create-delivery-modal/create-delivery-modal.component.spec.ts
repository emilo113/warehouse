import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeliveryModalComponent } from './create-delivery-modal.component';

describe('CreateDeliveryModalComponent', () => {
  let component: CreateDeliveryModalComponent;
  let fixture: ComponentFixture<CreateDeliveryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDeliveryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDeliveryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
