import { AfterViewInit, Component } from '@angular/core';
import { MapService } from '../../services';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  isActive: boolean = false;

  constructor(private mapService: MapService) {}

  ngAfterViewInit(): void {
    this.mapService.initialize();
  }
}
