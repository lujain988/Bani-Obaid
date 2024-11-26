import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAboutMunicipalityComponent } from './admin-about-municipality.component';

describe('AdminAboutMunicipalityComponent', () => {
  let component: AdminAboutMunicipalityComponent;
  let fixture: ComponentFixture<AdminAboutMunicipalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAboutMunicipalityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAboutMunicipalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
