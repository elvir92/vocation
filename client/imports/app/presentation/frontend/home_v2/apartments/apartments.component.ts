import { Component, OnInit, Input } from '@angular/core';
import { IApartment } from 'imports/models';
import { RentDetailsDialog } from './rent-details-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.scss']
})
export class ApartmentsComponent implements OnInit {
  @Input('backgroundGray') public backgroundGray;

  @Input() apartments: IApartment[] = [];

  @Input() filterOn: boolean = false;

  dialogRef: MatDialogRef<RentDetailsDialog>;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  isEmptyObjectAndFilterOff() {
    return this.isObjectEmpty(this.apartments) && !this.filterOn;
  }

  isEmptyObjectAndFilterOn() {
    return this.isObjectEmpty(this.apartments) && this.filterOn;
  }

  openDialog(item?): void {
    console.log(item);
    this.dialogRef = this.dialog.open(RentDetailsDialog, {
      height: '90%',
      width: '90%',
      data: item
    });
  }

  isObjectEmpty(obj) {
    return obj && Object.keys(obj).length === 0;
  }
}
