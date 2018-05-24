import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPositionsModalComponent } from './delivery-positions-modal.component';

describe('DeliveryPositionsModalComponent', () => {
  let component: DeliveryPositionsModalComponent;
  let fixture: ComponentFixture<DeliveryPositionsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryPositionsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryPositionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
