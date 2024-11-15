import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralLandComponent } from './general-land.component';

describe('GeneralLandComponent', () => {
  let component: GeneralLandComponent;
  let fixture: ComponentFixture<GeneralLandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralLandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
