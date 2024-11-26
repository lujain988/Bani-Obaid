import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBaniObaidTComponent } from './add-bani-obaid-t.component';

describe('AddBaniObaidTComponent', () => {
  let component: AddBaniObaidTComponent;
  let fixture: ComponentFixture<AddBaniObaidTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBaniObaidTComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBaniObaidTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
