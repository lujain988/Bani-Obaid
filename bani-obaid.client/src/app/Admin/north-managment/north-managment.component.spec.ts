import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NorthManagmentComponent } from './north-managment.component';

describe('NorthManagmentComponent', () => {
  let component: NorthManagmentComponent;
  let fixture: ComponentFixture<NorthManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NorthManagmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NorthManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
