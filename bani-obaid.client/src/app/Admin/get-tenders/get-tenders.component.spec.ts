import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTendersComponent } from './get-tenders.component';

describe('GetTendersComponent', () => {
  let component: GetTendersComponent;
  let fixture: ComponentFixture<GetTendersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetTendersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
