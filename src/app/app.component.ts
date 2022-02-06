import { Component, OnInit } from '@angular/core';
import { LocationService } from './shared/services/location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'geocode';

  constructor(private _locationService: LocationService) {

  }
  ngOnInit() {
    this._locationService.setDefaultLocations();
  }
}
