import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandMarkDetailsComponent } from './land-mark-details.component';

describe('LandMarkDetailsComponent', () => {
  let component: LandMarkDetailsComponent;
  let fixture: ComponentFixture<LandMarkDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandMarkDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandMarkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
