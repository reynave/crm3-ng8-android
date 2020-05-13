import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetActivityComponent } from './widget-activity.component';

describe('WidgetActivityComponent', () => {
  let component: WidgetActivityComponent;
  let fixture: ComponentFixture<WidgetActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
