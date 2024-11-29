import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPartnersComponent } from './edit-partners.component';

describe('EditPartnersComponent', () => {
  let component: EditPartnersComponent;
  let fixture: ComponentFixture<EditPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPartnersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
