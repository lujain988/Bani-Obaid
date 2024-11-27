import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAboutMunicipalityComponent } from './edit-about-municipality.component';

describe('EditAboutMunicipalityComponent', () => {
  let component: EditAboutMunicipalityComponent;
  let fixture: ComponentFixture<EditAboutMunicipalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAboutMunicipalityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAboutMunicipalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
