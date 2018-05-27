import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDispatchModalComponent } from './edit-dispatch-modal.component';

describe('EditDispatchModalComponent', () => {
  let component: EditDispatchModalComponent;
  let fixture: ComponentFixture<EditDispatchModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDispatchModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDispatchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
