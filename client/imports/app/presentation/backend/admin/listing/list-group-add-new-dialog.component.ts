import { FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';


@Component({
    selector: 'list-group-add-new-dialog',
    templateUrl: 'list-group-add-new-dialog.component.html',
})
export class ListGroupAddNewDialog {

    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<ListGroupAddNewDialog>,
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