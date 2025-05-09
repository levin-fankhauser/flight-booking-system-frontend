import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplaneOverviewComponent } from './airplane-overview.component';

describe('AirplaneOverviewComponent', () => {
  let component: AirplaneOverviewComponent;
  let fixture: ComponentFixture<AirplaneOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirplaneOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirplaneOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
