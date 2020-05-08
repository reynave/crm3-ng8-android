import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBottomMenuComponent } from './app-bottom-menu.component';

describe('AppBottomMenuComponent', () => {
  let component: AppBottomMenuComponent;
  let fixture: ComponentFixture<AppBottomMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppBottomMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppBottomMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
