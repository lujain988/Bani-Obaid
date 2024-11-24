import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralLandDetailsComponent } from './general-land-details.component';

describe('GeneralLandDetailsComponent', () => {
  let component: GeneralLandDetailsComponent;
  let fixture: ComponentFixture<GeneralLandDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralLandDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralLandDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
