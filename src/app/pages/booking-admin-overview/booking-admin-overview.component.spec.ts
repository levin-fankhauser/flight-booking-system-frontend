import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingAdminOverviewComponent } from './booking-admin-overview.component';

describe('BookingAdminOverviewComponent', () => {
  let component: BookingAdminOverviewComponent;
  let fixture: ComponentFixture<BookingAdminOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingAdminOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingAdminOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
