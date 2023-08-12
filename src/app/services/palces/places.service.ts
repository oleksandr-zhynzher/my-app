import { Injectable } from '@angular/core';

declare var google: any;

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  constructor() {}

  getAutocomplete(element: HTMLInputElement) {
    return new google.maps.places.Autocomplete(element, {
      types: ['(cities)'],
      componentRestrictions: { country: 'ua' },
    });
  }
}
