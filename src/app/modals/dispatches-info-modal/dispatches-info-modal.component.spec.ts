import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchesInfoModalComponent } from './dispatches-info-modal.component';

describe('DispatchesInfoModalComponent', () => {
  let component: DispatchesInfoModalComponent;
  let fixture: ComponentFixture<DispatchesInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchesInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchesInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
