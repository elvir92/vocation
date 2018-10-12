import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';


@Component({
    selector: 'property-type-dialog',
    templateUrl: 'property-type-dialog.component.html',
})
export class PropertyTypeDialog {
    
    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<PropertyTypeDialog>,
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