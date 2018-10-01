import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';


@Component({
    selector: 'places-dialog',
    templateUrl: 'places-dialog.component.html',
})
export class PlacesDialog {

    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<PlacesDialog>,
        @Inject(MAT_DIALOG_DATA) private data) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            title: this.data ? this.data.title : '',
            placeholder: this.data ? this.data.placeholder : ''
        })
    }

    submit(form) {
        this.dialogRef.close(form.value);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}