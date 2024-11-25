import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePresidentComponent } from './home-president.component';

describe('HomePresidentComponent', () => {
  let component: HomePresidentComponent;
  let fixture: ComponentFixture<HomePresidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePresidentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePresidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
