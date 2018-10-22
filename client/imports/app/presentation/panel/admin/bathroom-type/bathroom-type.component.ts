import { BathroomTypeDialog } from './bathroom-type-dialog.component';
import { BathroomTypes } from './../../../../../../../imports/collections/bathroom_types';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IText } from '../../../../../../../imports/models';
import { Observable } from 'rxjs/Observable';
import { MeteorObservable } from 'meteor-rxjs';
import 'rxjs/add/operator/combineLatest';
import { FormBuilder } from "@angular/forms";
import { ToasterService } from "angular2-toaster";
import { componentDestroyed } from "ng2-rx-componentdestroyed";
import { MatDialog, MatDialogRef } from '@angular/material';
import { filter } from 'rxjs/operators';
import { IBathroomType } from 'imports/models/bathroom_type';

@Component({
    templateUrl: './bathroom-type.component.html',
    styleUrls: ['./bathroom-type.component.scss']
})

export class BathroomTypeComponent implements OnInit, OnDestroy {
    list: Observable<IBathroomType[]>;

    currentBathroomType: IBathroomType;
    private toasterService: ToasterService;
    dialogRef: MatDialogRef<BathroomTypeDialog>;


    constructor(private formBuilder: FormBuilder,
        toasterService: ToasterService,
        public dialog: MatDialog) {
        this.toasterService = toasterService;
    }

    ngOnInit() {
        this.getBathroomTypes();
    }

    ngOnDestroy(): void {
    }

    openDialog(item?): void {
        this.dialogRef = this.dialog.open(BathroomTypeDialog, {
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

                    MeteorObservable.call('updateBathroomType', item).subscribe({
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

                    let item: IBathroomType = {
                        isActive: true,
                        type: texts,
                    };

                    MeteorObservable.call('addBathroomType', item).subscribe({
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

    delete(BathroomType: IBathroomType): void {
        if (BathroomType) {
            MeteorObservable.call('removeBathroomType', BathroomType).subscribe({
                next: () => {
                    this.getBathroomTypes();
                },
                error: (e: Error) => {
                    console.log(e);
                    this.toasterService.pop('error', '', e.message);
                }
            });
        }
    }

    getBathroomTypes() {
        MeteorObservable.subscribe('bathroom-types').takeUntil(componentDestroyed(this)).subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.list = this.findBathroomTypes();
            });
        });
    }

    findBathroomTypes(): Observable<IBathroomType[]> {
        return BathroomTypes.find();
    }

}