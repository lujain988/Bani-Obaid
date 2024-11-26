import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageHomePageComponent } from './image-home-page.component';

describe('ImageHomePageComponent', () => {
  let component: ImageHomePageComponent;
  let fixture: ComponentFixture<ImageHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
