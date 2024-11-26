import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowImageForNorthComponent } from './show-image-for-north.component';

describe('ShowImageForNorthComponent', () => {
  let component: ShowImageForNorthComponent;
  let fixture: ComponentFixture<ShowImageForNorthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowImageForNorthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowImageForNorthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
