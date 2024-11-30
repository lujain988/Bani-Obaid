import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImageHomePageComponent } from './add-image-home-page.component';

describe('AddImageHomePageComponent', () => {
  let component: AddImageHomePageComponent;
  let fixture: ComponentFixture<AddImageHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddImageHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddImageHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
