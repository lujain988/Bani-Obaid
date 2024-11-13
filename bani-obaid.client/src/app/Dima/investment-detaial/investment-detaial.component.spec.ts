import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentDetaialComponent } from './investment-detaial.component';

describe('InvestmentDetaialComponent', () => {
  let component: InvestmentDetaialComponent;
  let fixture: ComponentFixture<InvestmentDetaialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvestmentDetaialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmentDetaialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
