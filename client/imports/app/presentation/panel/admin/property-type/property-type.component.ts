import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPropertyType, IText } from '../../../../../../../imports/models';
import { PropertyTypes } from "../../../../../../../imports/collections";
import { Observable } from 'rxjs/Observable';
import { MeteorObservable } from 'meteor-rxjs';
import 'rxjs/add/operator/combineLatest';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgbModal, NgbModalOptions, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ToasterService } from "angular2-toaster";
import { componentDestroyed } from "ng2-rx-componentdestroyed";
import { MatDialog, MatDialogRef } from '@angular/material';
import { PropertyTypeDialog } from './property-type-dialog.component';
import { filter } from 'rxjs/operators';

@Component({
    templateUrl: './property-type.component.html',
    styleUrls: ['./property-type.component.scss']
})

export class PropertyTypeComponent implements OnInit, OnDestroy {
    list: Observable<IPropertyType[]>;

    currentPropertyType: IPropertyType;
    private toasterService: ToasterService;
    dialogRef: MatDialogRef<PropertyTypeDialog>;


    constructor(private formBuilder: FormBuilder,
        toasterService: ToasterService,
        public dialog: MatDialog) {
        this.toasterService = toasterService;
    }

    ngOnInit() {
        this.getPropertyTypes();
    }

    ngOnDestroy(): void {
    }

    openDialog(item?): void {
        this.dialogRef = this.dialog.open(PropertyTypeDialog, {
            data: {
                type: item ? item.type[0].text : ''
            }
        });

        this.dialogRef
            .afterClosed()
            .pipe(filter(type => type))
            .subscribe(type => {
                if (item) {
                    item.type[0].text = type;

                    MeteorObservable.call('updatePropertyType', item).subscribe({
                        next: () => {
                        },
                        error: (e: Error) => {
                            console.log(e);
                            this.toasterService.pop('error', '', e.message);
                        }
                    });
                } else {
                    let texts: IText[] = [];
                    let value: IText = {
                        text: type,
                        language: 'en'
                    };
                    texts.push(value);

                    let item: IPropertyType = {
                        isActive: true,
                        type: texts,
                    };

                    MeteorObservable.call('addPropertyType', item).subscribe({
                        next: () => {
                        },
                        error: (e: Error) => {
                            console.log(e);
                            this.toasterService.pop('error', '', e.message);
                        }
                    });
                }

            });
    }

    delete(propertyType: IPropertyType): void {
        if (propertyType) {
            MeteorObservable.call('removePropertyType', propertyType).subscribe({
                next: () => {
                    this.getPropertyTypes();
                },
                error: (e: Error) => {
                    console.log(e);
                    this.toasterService.pop('error', '', e.message);
                }
            });
        }
    }

    getPropertyTypes() {
        MeteorObservable.subscribe('property-types').takeUntil(componentDestroyed(this)).subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.list = this.findPropertyTypes();
            });
        });
    }

    findPropertyTypes(): Observable<IPropertyType[]> {
        return PropertyTypes.find();
    }

}