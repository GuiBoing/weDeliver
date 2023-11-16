import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCouponsComponent } from './tab-coupons.component';

describe('TabCouponsComponent', () => {
  let component: TabCouponsComponent;
  let fixture: ComponentFixture<TabCouponsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabCouponsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
