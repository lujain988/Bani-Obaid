import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminorganizationStructureComponent } from './adminorganization-structure.component';

describe('AdminorganizationStructureComponent', () => {
  let component: AdminorganizationStructureComponent;
  let fixture: ComponentFixture<AdminorganizationStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminorganizationStructureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminorganizationStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
