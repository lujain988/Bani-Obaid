import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnershipTransferManagementComponent } from './ownership-transfer-management.component';

describe('OwnershipTransferManagementComponent', () => {
  let component: OwnershipTransferManagementComponent;
  let fixture: ComponentFixture<OwnershipTransferManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OwnershipTransferManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnershipTransferManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
