import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightOverviewComponent } from './flight-overview.component';

describe('FlightOverviewComponent', () => {
  let component: FlightOverviewComponent;
  let fixture: ComponentFixture<FlightOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
