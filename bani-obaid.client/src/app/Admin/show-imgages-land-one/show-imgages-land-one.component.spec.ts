import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowImgagesLandOneComponent } from './show-imgages-land-one.component';

describe('ShowImgagesLandOneComponent', () => {
  let component: ShowImgagesLandOneComponent;
  let fixture: ComponentFixture<ShowImgagesLandOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowImgagesLandOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowImgagesLandOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
