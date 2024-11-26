import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandManagmentComponent } from './land-managment.component';

describe('LandManagmentComponent', () => {
  let component: LandManagmentComponent;
  let fixture: ComponentFixture<LandManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandManagmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
