import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { AirplaneService } from '../../service/airplane.service';
import { AirplaneDetailComponent } from './airplane-detail.component';

fdescribe('AirplaneDetailComponent', () => {
  let component: AirplaneDetailComponent;
  let fixture: ComponentFixture<AirplaneDetailComponent>;
  let airplaneServiceMock: any;
  let routerMock: any;
  let messageServiceMock: any;

  const mockParamMap = {
    get: (key: string) => (key === 'id' ? '123' : null),
    has: (key: string) => key === 'id',
    getAll: (key: string) => (key === 'id' ? ['123'] : []),
    keys: ['id'],
  };

  beforeEach(async () => {
    airplaneServiceMock = {
      getAirplane: jasmine.createSpy('getAirplane').and.returnValue(
        of({
          id: 123,
          brand: 'Boeing',
          model: '747',
          constructionYear: 1998,
          airline: 'Lufthansa',
          seatCapacity: 400,
          createdBy: 'Admin',
        })
      ),
      updateAirplane: jasmine
        .createSpy('updateAirplane')
        .and.returnValue(of({})),
      saveAirplane: jasmine.createSpy('saveAirplane').and.returnValue(of({})),
    };

    routerMock = {
      navigate: jasmine
        .createSpy('navigate')
        .and.returnValue(Promise.resolve(true)),
    };

    messageServiceMock = {
      add: jasmine.createSpy('add'),
    };

    await TestBed.configureTestingModule({
      imports: [AirplaneDetailComponent],
      providers: [
        UntypedFormBuilder,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: mockParamMap } },
        },
        { provide: AirplaneService, useValue: airplaneServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MessageService, useValue: messageServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AirplaneDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component and load airplane if id present', () => {
    expect(component).toBeTruthy();
    expect(airplaneServiceMock.getAirplane).toHaveBeenCalledWith(123);
    expect(component.title).toBe('Edit Airplane');
    expect(component.buttonLabel).toBe('Update');
    expect(component.airplane).toEqual(jasmine.objectContaining({ id: 123 }));
    expect(component.objForm.value.brand).toBe('Boeing');
  });

  it('should navigate back on back()', async () => {
    await component.back();
    expect(routerMock.navigate).toHaveBeenCalledWith(['airplanes']);
  });

  it('should call updateAirplane on save for existing airplane', () => {
    component.airplane = { id: 123 } as any;
    const formData = {
      id: 123,
      brand: 'Test',
      model: 'M',
      constructionYear: 2000,
      airline: 'A',
      seatCapacity: 100,
    };
    component.save(formData);
    expect(airplaneServiceMock.updateAirplane).toHaveBeenCalledWith(formData);
  });

  it('should call saveAirplane on save for new airplane', () => {
    component.airplane = { id: undefined } as any;
    const formData = {
      brand: 'New',
      model: 'N',
      constructionYear: 2020,
      airline: 'B',
      seatCapacity: 200,
    };
    component.save(formData);
    expect(airplaneServiceMock.saveAirplane).toHaveBeenCalledWith(formData);
  });
});
