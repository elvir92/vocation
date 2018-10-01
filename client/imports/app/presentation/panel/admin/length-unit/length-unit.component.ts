import {Component, OnDestroy, OnInit} from '@angular/core';
import {ILengthUnit, IText} from '../../../../../../../imports/models';
import {LengthUnits} from "../../../../../../../imports/collections";
import {Observable} from 'rxjs/Observable';
import {MeteorObservable} from 'meteor-rxjs';
import 'rxjs/add/operator/combineLatest';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {NgbModal, NgbModalOptions, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ToasterService} from "angular2-toaster";
import {componentDestroyed} from "ng2-rx-componentdestroyed";
import { MatDialog, MatDialogRef } from '@angular/material';
import { LengthUnitDialog } from './lenght-unit-dialog.component';
import { filter } from 'rxjs/operators';


@Component({
    //selector: 'app-dashboard',
    templateUrl: './length-unit.component.html',
    styleUrls: ['./length-unit.component.scss']

})

export class LengthUnitComponent implements OnInit, OnDestroy {
    list: Observable<ILengthUnit[]>;

    currentLengthUnit: ILengthUnit;
    private toasterService: ToasterService;
    dialogRef: MatDialogRef<LengthUnitDialog>;


    constructor(private formBuilder: FormBuilder,
                toasterService: ToasterService,
                public dialog: MatDialog) {
        this.toasterService = toasterService;
    }

    ngOnInit() {
        this.getLengthUnits();
    }

    ngOnDestroy(): void {
    }

    openDialog(item?): void {
        this.dialogRef = this.dialog.open(LengthUnitDialog, {
            data: {
                title: item ? item.title[0].text : ''
            }
        });

        this.dialogRef
            .afterClosed()
            .pipe(filter(title => title))
            .subscribe(title => {
                if (item) {
                    item.title[0].text = title;

                    MeteorObservable.call('updateLengthUnit', item).subscribe({
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
                        text: title,
                        language: 'en'
                    };
                    texts.push(value);

                    let item: ILengthUnit = {
                        isActive: true,
                        title: texts,
                    };

                    MeteorObservable.call('addLengthUnit', item).subscribe({
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

    delete(lengthUnit: ILengthUnit): void {
        if (lengthUnit) {
            MeteorObservable.call('removeLengthUnit', lengthUnit).subscribe({
                next: () => {
                    this.getLengthUnits();
                },
                error: (e: Error) => {
                    console.log(e);
                    this.toasterService.pop('error', '', e.message);
                }
            });
        }
    }

    getLengthUnits() {
        MeteorObservable.subscribe('length-units').takeUntil(componentDestroyed(this)).subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.list = this.findLengthUnits();
            });
        });
    }

    findLengthUnits(): Observable<ILengthUnit[]> {
        return LengthUnits.find();
    }

}