import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ILocation } from '../models/location.model';
import * as Locations from './locations.json';

const INITIAL_LOCATIONS: any = Locations;

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  location$ = new Subject();
  locations$ = new Subject<ILocation[]>();

  private endpoint: string = `https://api.locationiq.com/v1/autocomplete.php?key=pk.c445505378612728135829cfedddd86b`;

  constructor(private _http: HttpClient) { }

  setDefaultLocations() {
    if (!!this.getStorageLocations()) { return; }

    localStorage.setItem('_locations', JSON.stringify(INITIAL_LOCATIONS.default));
  }

  getStorageLocations() {
    return localStorage.getItem('_locations');
  }

  getLocation() {
    return this.location$;
  }

  getLocations(query: string): any {
    const endpoint = `${this.endpoint}&q=${query}&tag=place:country,place:town,place:city,place:village&limit=20&format=json`
    return this._http.get(endpoint);
  }
}
