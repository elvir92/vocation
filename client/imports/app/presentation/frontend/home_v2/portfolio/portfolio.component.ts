import { Component, OnInit, Input } from '@angular/core';
import { IProperty } from 'imports/models';
import { RentDetailsDialog } from './rent-details-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  @Input('backgroundGray') public backgroundGray;

  @Input('properties') properties: IProperty[] = [];

  @Input('filterOn') filterOn: boolean = false;

  dialogRef: MatDialogRef<RentDetailsDialog>;
  
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  isEmptyObjectAndFilterOff(obj, filterOn) {
    return (obj && (Object.keys(obj).length === 0) && !filterOn);
  }

  isEmptyObjectAndFilterOn(obj, filterOn) {
    return (obj && (Object.keys(obj).length === 0) && filterOn);
  }

  openDialog(item?): void {
        console.log(item);
        this.dialogRef = this.dialog.open(RentDetailsDialog, {
          height: '90%',
          width: '90%',
          data: item
        });
    }

}
