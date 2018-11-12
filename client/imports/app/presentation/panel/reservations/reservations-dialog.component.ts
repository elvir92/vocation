import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { IProperty } from 'imports/models';


@Component({
    selector: 'reservations-dialog',
    templateUrl: 'reservations-dialog.component.html',
})
export class ReservationsDialog {
    
    form: FormGroup;
    properties: IProperty[];

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<ReservationsDialog>,
        @Inject(MAT_DIALOG_DATA) private data) { }

    ngOnInit() {        
        this.form = this.formBuilder.group({
            propertyId: this.data ? this.data.propertyId : '',
            from: this.data ? this.data.from : '',
            to: this.data ? this.data.to : '',
            status: this.data ? this.data.status : ''
        });
    }

    submit(form) {
        this.dialogRef.close(form.value);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}