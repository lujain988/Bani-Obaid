import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatNorthComponent } from './updat-north.component';

describe('UpdatNorthComponent', () => {
  let component: UpdatNorthComponent;
  let fixture: ComponentFixture<UpdatNorthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatNorthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatNorthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
