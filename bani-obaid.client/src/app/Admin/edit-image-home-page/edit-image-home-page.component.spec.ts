import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditImageHomePageComponent } from './edit-image-home-page.component';

describe('EditImageHomePageComponent', () => {
  let component: EditImageHomePageComponent;
  let fixture: ComponentFixture<EditImageHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditImageHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditImageHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
