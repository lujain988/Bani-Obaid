import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTendersComponent } from './update-tenders.component';

describe('UpdateTendersComponent', () => {
  let component: UpdateTendersComponent;
  let fixture: ComponentFixture<UpdateTendersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateTendersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
