import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DialogRef, DialogService } from '@ngneat/dialog';
import { ILocation } from 'src/app/shared/models/location.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit {

  data: ILocation | any;
  @Output() buttonClick = new EventEmitter<any>();

  constructor(private _dialogRef: DialogRef) { }

  ngOnInit(): void {
    this.data = this._dialogRef.data.location;
  }

  viewDetails() {
    document.querySelector('.header')?.classList.remove('show');
    this._dialogRef.close(this.data);
  }

}
