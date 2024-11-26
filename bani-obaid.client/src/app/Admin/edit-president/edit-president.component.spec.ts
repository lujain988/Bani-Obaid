import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPresidentComponent } from './edit-president.component';

describe('EditPresidentComponent', () => {
  let component: EditPresidentComponent;
  let fixture: ComponentFixture<EditPresidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPresidentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPresidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
