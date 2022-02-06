import { Component, OnInit } from '@angular/core';
import { DialogRef } from '@ngneat/dialog';
import { ILocation } from 'src/app/shared/models/location.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  data: ILocation | any;

  constructor(private _dialogRef: DialogRef) { }

  ngOnInit(): void {
    this.data = this._dialogRef.data.location;
  }

}
