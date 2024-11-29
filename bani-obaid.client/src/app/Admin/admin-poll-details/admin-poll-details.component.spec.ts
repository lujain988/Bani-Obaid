import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPollDetailsComponent } from './admin-poll-details.component';

describe('AdminPollDetailsComponent', () => {
  let component: AdminPollDetailsComponent;
  let fixture: ComponentFixture<AdminPollDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminPollDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPollDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
