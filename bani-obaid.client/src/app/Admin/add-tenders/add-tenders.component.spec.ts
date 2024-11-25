import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTendersComponent } from './add-tenders.component';

describe('AddTendersComponent', () => {
  let component: AddTendersComponent;
  let fixture: ComponentFixture<AddTendersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTendersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
