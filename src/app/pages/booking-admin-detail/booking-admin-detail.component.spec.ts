import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingAdminDetailComponent } from './booking-admin-detail.component';

describe('BookingAdminDetailComponent', () => {
  let component: BookingAdminDetailComponent;
  let fixture: ComponentFixture<BookingAdminDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingAdminDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingAdminDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
