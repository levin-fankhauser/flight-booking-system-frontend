import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerAdminDetailComponent } from './passenger-admin-detail.component';

describe('PassengerAdminDetailComponent', () => {
  let component: PassengerAdminDetailComponent;
  let fixture: ComponentFixture<PassengerAdminDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassengerAdminDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerAdminDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
