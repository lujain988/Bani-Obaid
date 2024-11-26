import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLandMarkComponent } from './update-land-mark.component';

describe('UpdateLandMarkComponent', () => {
  let component: UpdateLandMarkComponent;
  let fixture: ComponentFixture<UpdateLandMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateLandMarkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLandMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
