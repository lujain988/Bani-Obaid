import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPresidentComponent } from './admin-president.component';

describe('AdminPresidentComponent', () => {
  let component: AdminPresidentComponent;
  let fixture: ComponentFixture<AdminPresidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPresidentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPresidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
