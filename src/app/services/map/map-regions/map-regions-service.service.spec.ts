import { TestBed } from '@angular/core/testing';

import { MapRegionsService } from './map-regions-service.service';

describe('MapRegionsService', () => {
  let service: MapRegionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapRegionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
