import { Injectable } from '@angular/core';
import * as maptilersdk from '@maptiler/sdk';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  get mapConfig(): any {
    return {
      apiKey: '5uRGwHXZMLzu7CHWsNKp',
      primaryLanguage: maptilersdk.Language.UKRAINIAN,
      containerId: 'map',
      style: maptilersdk.MapStyle.STREETS,
      center: [31, 49.16],
      zoom: 5,
    };
  }

  get maptilersdkMapConfig(): any {
    return {
      container: this.mapConfig.containerId,
      style: this.mapConfig.style,
      center: this.mapConfig.center,
      zoom: this.mapConfig.zoom,
    }
  }
}
