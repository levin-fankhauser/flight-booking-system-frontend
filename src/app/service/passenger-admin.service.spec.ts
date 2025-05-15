import { TestBed } from '@angular/core/testing';

import { PassengerAdminService } from './passenger-admin.service';

describe('PassengerAdminService', () => {
  let service: PassengerAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassengerAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
