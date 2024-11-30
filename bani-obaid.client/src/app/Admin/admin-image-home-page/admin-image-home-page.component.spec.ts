import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminImageHomePageComponent } from './admin-image-home-page.component';

describe('AdminImageHomePageComponent', () => {
  let component: AdminImageHomePageComponent;
  let fixture: ComponentFixture<AdminImageHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminImageHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminImageHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
