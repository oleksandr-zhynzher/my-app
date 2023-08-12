import {
  Component,
  ElementRef,
  EventEmitter,
  NgZone,
  Output,
  ViewChild,
} from '@angular/core';
import { PlacesService } from 'src/app/services/palces/places.service';

@Component({
  selector: 'app-city-finder',
  templateUrl: './city-finder.component.html',
  styleUrls: ['./city-finder.component.scss'],
})
export class CityFinderComponent {
  @ViewChild('search') public searchElement: ElementRef | any;
  @Output() citySelected: EventEmitter<{
    cityName: string;
    lat: number;
    lng: number;
  }> = new EventEmitter();

  cities: any[] = [];

  constructor(private ngZone: NgZone, private placesService: PlacesService) {}

  ngAfterViewInit() {
    const autocomplete = this.placesService.getAutocomplete(
      this.searchElement.nativeElement
    );

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = autocomplete.getPlace();

        if (place.geometry && place.geometry.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();

          // Store the city's name and its geocoordinates
          this.citySelected.emit({
            cityName: place.name,
            lat: lat,
            lng: lng,
          });

          this.cities.push({
            description: place.name,
            lat: lat,
            lng: lng,
          });
        }
      });
    });
  }
}
