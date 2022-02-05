import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ILocation } from 'src/app/shared/models/location.model';
import { LocationService } from 'src/app/shared/services/location.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  results: ILocation[] = [];
  
  terms$ = new Subject<string>();

  debounce_time: number = 800;

  loading: boolean = false;

  constructor(private _locationService: LocationService) { }

  ngOnInit(): void {
    this.getLocations();
    
    this.terms$.pipe(
      debounceTime(this.debounce_time),
      distinctUntilChanged(), 
    ).subscribe((term) => {
      this.getLocations(<string>term);
    });
    
  }

  getLocations(term: string = 'Kamenice') {
    this.loading = true;
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

  selectLocation(item: any) {
    this._locationService.location$.next(item);
  }

}

