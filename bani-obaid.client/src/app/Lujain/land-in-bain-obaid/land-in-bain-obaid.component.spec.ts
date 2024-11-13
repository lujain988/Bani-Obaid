import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandInBainObaidComponent } from './land-in-bain-obaid.component';

describe('LandInBainObaidComponent', () => {
  let component: LandInBainObaidComponent;
  let fixture: ComponentFixture<LandInBainObaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandInBainObaidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandInBainObaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
