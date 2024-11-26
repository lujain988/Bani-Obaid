import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewNorthComponent } from './add-new-north.component';

describe('AddNewNorthComponent', () => {
  let component: AddNewNorthComponent;
  let fixture: ComponentFixture<AddNewNorthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewNorthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewNorthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
