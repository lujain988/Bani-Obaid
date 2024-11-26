import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBaniObaidGeneralComponent } from './add-bani-obaid-general.component';

describe('AddBaniObaidGeneralComponent', () => {
  let component: AddBaniObaidGeneralComponent;
  let fixture: ComponentFixture<AddBaniObaidGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBaniObaidGeneralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBaniObaidGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
