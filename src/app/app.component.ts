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
    let data: any = this._locationService.getStorageLocations();
    const dat = JSON.parse(data);

    console.log(dat);
    
    const res: any[] = [];

    // console.log(res.pop());

    // const btn = document.createElement('button');
    // btn.innerText = 'Shtoje njo bre';
    // btn.setAttribute('style', `position: fixed; top: 10px; right: 10px;z-index: 5555; background: #222; color: #fff; padding: 10px 20px;`);
    // btn.addEventListener('click', () => {
    //   res.push({name: 'hmmm'});

    //   localStorage.setItem('_locations', JSON.stringify(res));
    // });
    // document.body.appendChild(btn);
  }
}
