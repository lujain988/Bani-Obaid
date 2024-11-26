import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSuggestionComponent } from './get-suggestion.component';

describe('GetSuggestionComponent', () => {
  let component: GetSuggestionComponent;
  let fixture: ComponentFixture<GetSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetSuggestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
