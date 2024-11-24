import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPollsComponent } from './get-polls.component';

describe('GetPollsComponent', () => {
  let component: GetPollsComponent;
  let fixture: ComponentFixture<GetPollsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetPollsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetPollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
