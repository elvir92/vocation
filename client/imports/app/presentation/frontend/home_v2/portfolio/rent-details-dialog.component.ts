import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
    selector: 'rent-details-dialog',
    templateUrl: 'rent-details-dialog.component.html',
    styleUrls: ['rent-details-dialog.component.scss']
})
export class RentDetailsDialog {
    constructor(
        public dialogRef: MatDialogRef<RentDetailsDialog>,
        @Inject(MAT_DIALOG_DATA) private data
        ) { }

    ngOnInit() {
    }
    onNoClick(): void {
        this.dialogRef.close();
    }

}