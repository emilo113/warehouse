import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDifferenceReportComponent } from './create-difference-report.component';

describe('CreateDifferenceReportComponent', () => {
  let component: CreateDifferenceReportComponent;
  let fixture: ComponentFixture<CreateDifferenceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDifferenceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDifferenceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
