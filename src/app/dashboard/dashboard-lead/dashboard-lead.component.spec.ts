import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLeadComponent } from './dashboard-lead.component';

describe('DashboardLeadComponent', () => {
  let component: DashboardLeadComponent;
  let fixture: ComponentFixture<DashboardLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
