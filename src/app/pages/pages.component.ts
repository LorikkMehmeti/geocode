import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.js"; 
import { HttpClient } from "@angular/common/http";
import { LocationService } from '../shared/services/location.service';
import { ILocation } from '../shared/models/location.model';

const iconUrl = "https://www.freeiconspng.com/thumbs/pin-png/pin-png-28.png";
const iconDefault = L.icon({
  iconUrl,
  iconSize: [20, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, AfterViewInit {
  
  private map: any;
  
  constructor(private _locationService: LocationService) { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnInit(): void {
    this.getPlace();
  }

  getPlace() {
      this._locationService.location$.subscribe((res: any) => {
        const result = res;
        console.log(result);
        this.map.flyTo([+result.lat, +result.lon], this.getSize(result.type));
      
        const marker = L.marker([+result.lat, +result.lon]);
      
        if(['town', 'city'].includes(result.type)) {
          marker.addTo(this.map);
        } else {
          marker.remove();          
        }
      });
    // this._locationService.getLocations('Kamenice')
    // .subscribe((res: ILocation[]) => {
    //   this._locationService.locations$.next(res);
    //   const result = res[9];
    //   this.map.flyTo([+result.lat, +result.lon], this.getSize(result.type));
    
    //   const marker = L.marker([+result.lat, +result.lon]);
    
    //   if(['town', 'city'].includes(result.type)) {
    //     marker.addTo(this.map);
    //   } else {
    //     marker.remove();          
    //   }
    // });
  }

  getSize(type: string): string {
    const sizes: any = {
      town: 14,
      city: 14,
      state: 9,
      country: 9,
      village: 15
    };
    return sizes[type];
  }

  private initMap(): void {
    this.map = L.map("map", {
      maxZoom: 20,
      minZoom: 6,
      zoomControl: false
    });
    const lat = 42.5812894;
    const lon = 21.5811607;

    this.map.setView([lat, lon], 12);
    const marker = L.marker([lat, +lon]);

    // marker.addTo(this.map);
    // marker.remove();

    this.getPlace();

    const tiles = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    ).addTo(this.map);

    tiles.addTo(this.map);
    L.control.zoom({
      position: 'bottomright'
    }).addTo(this.map);

    (L.Control as any).geocoder().addTo(this.map);
  }

}
