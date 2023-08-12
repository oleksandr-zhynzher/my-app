import { TestBed } from '@angular/core/testing';
import { MapMarkersClusterService } from './map-markers-cluster-service.service';


describe('MapMarkersClusterServiceService', () => {
  let service: MapMarkersClusterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapMarkersClusterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
