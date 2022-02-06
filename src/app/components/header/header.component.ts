import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ILocation } from 'src/app/shared/models/location.model';
import { LocationService } from 'src/app/shared/services/location.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './2-header.component.scss']
})
export class HeaderComponent implements OnInit {

  results: ILocation[] = [];
  
  terms$ = new Subject<string>();

  debounce_time: number = 800;

  loading: boolean = false;
  saved_locations: any;

  constructor(private _locationService: LocationService) { }

  ngOnInit(): void {
    this.terms$.pipe(
      debounceTime(this.debounce_time),
      distinctUntilChanged(), 
    ).subscribe((term) => {
      this.getLocations(<string>term);
    });
    this.getSavedLocations();
  }

  getSavedLocations() {
    const data: any = this._locationService.getStorageLocations();
    this.saved_locations = JSON.parse(data);
  }

  getLocations(term: string = '') {
    this._locationService.getLocations(term)
    .subscribe((res: ILocation[]) => {
      this.results = res;
      this._locationService.locations$.next(res);
      this.loading = false; 
    }, () => {
      this.results = [];
      this.loading = false;
    });
  }

  keyUpInput(value: string): void {
    this.loading = true;
    this.terms$.next(value);
  }

  selectLocation(item: any) {
    this._locationService.location$.next(item);
  }

}

