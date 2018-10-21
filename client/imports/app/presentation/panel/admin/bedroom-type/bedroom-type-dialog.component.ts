import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';


@Component({
    selector: 'bedroom-type-dialog',
    templateUrl: 'bedroom-type-dialog.component.html',
})
export class BedroomTypeDialog {
    
    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<BedroomTypeDialog>,
        @Inject(MAT_DIALOG_DATA) private data) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            type: this.data ? this.data.type : ''
        })
    }

    submit(form) {
        this.dialogRef.close(`${form.value.type}`);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}