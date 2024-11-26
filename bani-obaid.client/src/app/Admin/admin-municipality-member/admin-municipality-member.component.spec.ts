import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMunicipalityMemberComponent } from './admin-municipality-member.component';

describe('AdminMunicipalityMemberComponent', () => {
  let component: AdminMunicipalityMemberComponent;
  let fixture: ComponentFixture<AdminMunicipalityMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminMunicipalityMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMunicipalityMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
