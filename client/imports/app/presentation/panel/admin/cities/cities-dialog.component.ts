import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';


@Component({
    selector: 'cities-dialog',
    templateUrl: 'cities-dialog.component.html',
})
export class CitiesDialog {

    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<CitiesDialog>,
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
