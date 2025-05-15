import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerAdminOverviewComponent } from './passenger-admin-overview.component';

describe('PassengerAdminOverviewComponent', () => {
  let component: PassengerAdminOverviewComponent;
  let fixture: ComponentFixture<PassengerAdminOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassengerAdminOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerAdminOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
