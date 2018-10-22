import { Component, OnDestroy, OnInit } from '@angular/core';
import { IText } from '../../../../../../../imports/models';
import { Observable } from 'rxjs/Observable';
import { MeteorObservable } from 'meteor-rxjs';
import 'rxjs/add/operator/combineLatest';
import { FormBuilder } from "@angular/forms";
import { ToasterService } from "angular2-toaster";
import { componentDestroyed } from "ng2-rx-componentdestroyed";
import { MatDialog, MatDialogRef } from '@angular/material';
import { BedroomTypeDialog } from './bedroom-type-dialog.component';
import { filter } from 'rxjs/operators';
import { IBedroomType } from 'imports/models/bedroom_type';
import { BedroomTypes } from 'imports/collections/bedroom_types';

@Component({
    templateUrl: './bedroom-type.component.html',
    styleUrls: ['./bedroom-type.component.scss']
})

export class BedroomTypeComponent implements OnInit, OnDestroy {
    list: Observable<IBedroomType[]>;

    currentBedroomType: IBedroomType;
    private toasterService: ToasterService;
    dialogRef: MatDialogRef<BedroomTypeDialog>;


    constructor(private formBuilder: FormBuilder,
        toasterService: ToasterService,
        public dialog: MatDialog) {
        this.toasterService = toasterService;
    }

    ngOnInit() {
        this.getBedroomTypes();
    }

    ngOnDestroy(): void {
    }

    openDialog(item?): void {
        this.dialogRef = this.dialog.open(BedroomTypeDialog, {
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

                    MeteorObservable.call('updateBedroomType', item).subscribe({
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

                    let item: IBedroomType = {
                        isActive: true,
                        type: texts,
                    };

                    MeteorObservable.call('addBedroomType', item).subscribe({
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

    delete(bedroomType: IBedroomType): void {
        if (bedroomType) {
            MeteorObservable.call('removeBedroomType', bedroomType).subscribe({
                next: () => {
                    this.getBedroomTypes();
                },
                error: (e: Error) => {
                    console.log(e);
                    this.toasterService.pop('error', '', e.message);
                }
            });
        }
    }

    getBedroomTypes() {
        MeteorObservable.subscribe('bedroom-types').takeUntil(componentDestroyed(this)).subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.list = this.findBedroomTypes();
            });
        });
    }

    findBedroomTypes(): Observable<IBedroomType[]> {
        return BedroomTypes.find();
    }

}