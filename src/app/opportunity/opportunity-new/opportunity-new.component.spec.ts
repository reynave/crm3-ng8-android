import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityNewComponent } from './opportunity-new.component';

describe('OpportunityNewComponent', () => {
  let component: OpportunityNewComponent;
  let fixture: ComponentFixture<OpportunityNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
