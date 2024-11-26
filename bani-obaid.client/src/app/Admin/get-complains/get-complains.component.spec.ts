import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetComplainsComponent } from './get-complains.component';

describe('GetComplainsComponent', () => {
  let component: GetComplainsComponent;
  let fixture: ComponentFixture<GetComplainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetComplainsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetComplainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
