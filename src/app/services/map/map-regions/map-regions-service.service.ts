import { Injectable } from '@angular/core';
import * as maptilersdk from '@maptiler/sdk';

@Injectable({
  providedIn: 'root',
})
export class MapRegionsService {
  map: any;

  constructor() {}

  initialize(map: any): void {
    this.map = map;
    map.addSource('ukraine-regions', {
      type: 'geojson',
      data: 'assets/ukraine-regions.geojson', // your GeoJSON data
    });

    // Add the line layer to represent the borders
    map.addLayer({
      id: 'region-borders',
      type: 'line',
      source: 'ukraine-regions',
      layout: {},
      paint: {
        'line-color': '#FF0000', // red color for the borders
        'line-width': 2,
      },
    });
  }
}
