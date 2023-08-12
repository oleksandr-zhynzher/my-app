import { Injectable } from '@angular/core';
import * as maptilersdk from '@maptiler/sdk';
import {
  ConfigService,
  MapMarkersClusterService,
  MapRegionsService,
} from '../../';
import { ComplainsService } from '../../complains/complains.service';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  map: any;
  isActive: boolean = false;
  mapConfiguration: any = this.config.mapConfig;
  selctedLanguage: string = this.config.mapConfig.primaryLanguage;

  constructor(
    private mapMarkerClusterService: MapMarkersClusterService,
    private config: ConfigService,
    private mapRegionsService: MapRegionsService,
    private compService: ComplainsService
  ) {}

  initialize(): void {
    this.map = this.initializeMap();
    this.map.on('load', () => {
      this.compService.getComplaint().subscribe((data) => {
        const mappedData = data.map((complaint) => ({
          type: 'Feature',
          properties: {
            id: complaint.id,
            mag: +complaint.levelOfVerification,
          },
          geometry: {
            type: 'Point',
            coordinates: [complaint.lng, complaint.lat, 0.0],
          },
        }));
        this.setupSourceDataToMap(mappedData);
        this.handleMapEvents();
        this.mapMarkerClusterService.initialize(this.map);
        this.mapRegionsService.initialize(this.map);
      });
    });
  }

  private initializeMap(): any {
    maptilersdk.config.apiKey = this.mapConfiguration.apiKey;
    maptilersdk.config.primaryLanguage = this.mapConfiguration.primaryLanguage;
    return new maptilersdk.Map(this.config.maptilersdkMapConfig);
  }

  private createLevelConditions(): any[] {
    const level1 = ['<', ['get', 'mag'], 1];
    const level2 = ['all', ['>=', ['get', 'mag'], 1], ['<', ['get', 'mag'], 2]];
    const level3 = ['all', ['>=', ['get', 'mag'], 2], ['<', ['get', 'mag'], 3]];

    return [level1, level2, level3];
  }

  private setupSourceDataToMap(data: any): void {
    console.log('data = ', data);

    const geojsonData = {
      type: 'FeatureCollection',
      crs: {
        type: 'name',
        properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' },
      },
      features: data,
    };

    const levelConditions = this.createLevelConditions();

    this.map.addSource('complaints', {
      type: 'geojson',
      data: geojsonData,
      cluster: true,
      clusterRadius: 80,
      clusterProperties: {
        level1: ['+', ['case', levelConditions[0], 1, 0]],
        level2: ['+', ['case', levelConditions[1], 1, 0]],
        level3: ['+', ['case', levelConditions[2], 1, 0]],
      },
    });
  }

  private handleMapEvents(): void {
    this.map.on('click', 'complaint_label', (data: any) => {
      console.log('click on complaint_label ', data);
    });

    this.map.on('click', 'complaint_circle', (data: any) => {
      console.log('click on complaint_circle ', data);
    });
  }
}
