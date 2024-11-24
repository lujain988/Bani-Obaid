import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalityMemberComponent } from './municipality-member.component';

describe('MunicipalityMemberComponent', () => {
  let component: MunicipalityMemberComponent;
  let fixture: ComponentFixture<MunicipalityMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MunicipalityMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MunicipalityMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
