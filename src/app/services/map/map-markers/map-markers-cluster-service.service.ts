import { Injectable } from '@angular/core';
import {
  createDonutChart,
  createLevelLessThan,
  createLevelRange,
} from '../../../utils/map';
import { colors } from 'src/app/constants/map';
import * as maptilersdk from '@maptiler/sdk';

@Injectable({
  providedIn: 'root',
})
export class MapMarkersClusterService {
  map: any;
  markers: any = {};
  markersOnScreen: any = {};

  constructor() {}

  initialize(map: any): void {
    this.map = map;
    this.addLayersToMap();
    this.handleMapResize();
  }

  private addLayersToMap(): void {
    this.map.addLayer({
      id: 'complaint_circle',
      type: 'circle',
      source: 'complaints',
      filter: ['!=', 'cluster', true],
      paint: {
        'circle-color': [
          'case',
          createLevelLessThan(1),
          colors[0],
          createLevelRange(1, 2),
          colors[1],
          createLevelRange(2, 3),
          colors[3],
          colors[4],
        ],
        'circle-opacity': 1,
        'circle-radius': 16,
      },
    });

    this.map.addLayer({
      id: 'complaint_label',
      type: 'symbol',
      source: 'complaints',
      filter: ['!=', 'cluster', true],
      layout: {
        'text-field': [
          'number-format',
          1,
          { 'min-fraction-digits': 0, 'max-fraction-digits': 2 },
        ],
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-size': 16,
      },
      paint: {
        'text-color': ['case', ['<', ['get', 'mag'], 3], 'black', 'white'],
      },
    });
  }

  private updateMarkers(): void {
    const newMarkers: any = {};
    const features: any = this.map.querySourceFeatures('complaints');

    features.forEach((feature: any) => {
      const { geometry, properties } = feature;
      const { cluster, cluster_id } = properties;

      if (!cluster) return;

      const marker: any =
        this.markers[cluster_id] ||
        this.createMarker(cluster_id, properties, geometry.coordinates);

      newMarkers[cluster_id] = marker;

      if (!this.markersOnScreen[cluster_id]) marker.addTo(this.map);
    });

    this.removeOffscreenMarkers(newMarkers);
    this.markersOnScreen = newMarkers;
  }

  private createMarker(id: any, props: any, coords: any): any {
    const element: any = createDonutChart(props);
    const marker = new maptilersdk.Marker({ element }).setLngLat(coords);
    const markerElement = marker.getElement();
    markerElement.dataset['markerId'] = id; // Store the id in a data attribute
    markerElement.addEventListener('click', (event: any) => {
      console.log('Set it active');
    });

    this.markers[id] = marker;

    return marker;
  }

  private removeOffscreenMarkers(newMarkers: any): void {
    for (let id in this.markersOnScreen) {
      if (!newMarkers[id]) this.markersOnScreen[id].remove();
    }
  }

  private handleMapResize(): void {
    this.map.on('data', (e: any) => {
      if (e.sourceId !== 'complaints' || !e.isSourceLoaded) return;

      this.map.on('move', () => this.updateMarkers());
      this.map.on('moveend', () => this.updateMarkers());
      this.updateMarkers();
    });
  }
}
