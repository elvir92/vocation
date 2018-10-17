import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';


@Component({
    selector: 'addresses-dialog',
    templateUrl: 'addresses-dialog.component.html',
})
export class AddressesDialog {

    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<AddressesDialog>,
        @Inject(MAT_DIALOG_DATA) private data) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            cityName: this.data ? this.data.cityName : '',
        })
    }

    submit(form) {
        this.dialogRef.close(form.value);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
