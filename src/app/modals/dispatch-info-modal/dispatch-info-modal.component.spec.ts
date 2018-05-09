import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchInfoModalComponent } from './dispatch-info-modal.component';

describe('DispatchInfoModalComponent', () => {
  let component: DispatchInfoModalComponent;
  let fixture: ComponentFixture<DispatchInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispatchInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispatchInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
