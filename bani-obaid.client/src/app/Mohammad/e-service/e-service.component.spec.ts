import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EServiceComponent } from './e-service.component';

describe('EServiceComponent', () => {
  let component: EServiceComponent;
  let fixture: ComponentFixture<EServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
