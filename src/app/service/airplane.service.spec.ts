import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { Airplane } from '../data/airplane';
import { AirplaneService } from './airplane.service';

describe('AirplaneService', () => {
  let service: AirplaneService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.backendBaseUrl + 'airplane';

  const mockAirplane: Airplane = {
    id: 1,
    brand: 'Boeing',
    model: '737',
    constructionYear: 2010,
    airline: 'Lufthansa',
    seatCapacity: 150,
    createdBy: 'admin',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AirplaneService],
    });

    service = TestBed.inject(AirplaneService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all airplanes', () => {
    service.getAllAirplanes().subscribe((airplanes) => {
      expect(airplanes.length).toBe(1);
      expect(airplanes[0]).toEqual(mockAirplane);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush([mockAirplane]);
  });

  it('should get a single airplane by id', () => {
    service.getAirplane(1).subscribe((airplane) => {
      expect(airplane).toEqual(mockAirplane);
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAirplane);
  });

  it('should update an airplane', () => {
    service.updateAirplane(mockAirplane).subscribe((updated) => {
      expect(updated).toEqual(mockAirplane);
    });

    const req = httpMock.expectOne(`${baseUrl}/${mockAirplane.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockAirplane);
    req.flush(mockAirplane);
  });

  it('should save a new airplane', () => {
    service.saveAirplane(mockAirplane).subscribe((saved) => {
      expect(saved).toEqual(mockAirplane);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockAirplane);
    req.flush(mockAirplane);
  });

  it('should delete an airplane by id', () => {
    service.deleteAirplane(1).subscribe((res) => {
      expect(res.status).toBe(204);
    });

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush('', { status: 204, statusText: 'No Content' });
  });
});
