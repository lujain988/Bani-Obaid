import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMunicipalityComponent } from './about-municipality.component';

describe('AboutMunicipalityComponent', () => {
  let component: AboutMunicipalityComponent;
  let fixture: ComponentFixture<AboutMunicipalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutMunicipalityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutMunicipalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
