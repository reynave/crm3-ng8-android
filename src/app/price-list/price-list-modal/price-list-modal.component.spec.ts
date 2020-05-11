import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListModalComponent } from './price-list-modal.component';

describe('PriceListModalComponent', () => {
  let component: PriceListModalComponent;
  let fixture: ComponentFixture<PriceListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
