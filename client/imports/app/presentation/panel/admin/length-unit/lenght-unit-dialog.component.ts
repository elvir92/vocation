import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';


@Component({
    selector: 'lenght-unit-dialog',
    templateUrl: 'lenght-unit-dialog.component.html',
})
export class LengthUnitDialog {

    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<LengthUnitDialog>,
        @Inject(MAT_DIALOG_DATA) private data) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            title: this.data ? this.data.title : ''
        })
    }

    submit(form) {
        this.dialogRef.close(`${form.value.title}`);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}