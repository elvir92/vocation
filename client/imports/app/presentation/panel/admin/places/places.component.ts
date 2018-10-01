import { PlacesDialog } from './places-dialog.component';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {IPlace} from '../../../../../../../imports/models';
import {Places} from "../../../../../../../imports/collections";
import {Observable} from 'rxjs/Observable';
import {MeteorObservable} from 'meteor-rxjs';
import 'rxjs/add/operator/combineLatest';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {NgbModal, NgbModalOptions, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ToasterService} from "angular2-toaster";
import {componentDestroyed} from "ng2-rx-componentdestroyed";
import { MatDialogRef, MatDialog } from '@angular/material';
import { filter } from 'rxjs/operators';

@Component({
    //selector: 'app-dashboard',
    templateUrl: './places.component.html',
    styleUrls: ['./places.component.scss']
})

export class PlacesComponent implements OnInit, OnDestroy {
    list: Observable<IPlace[]>;
    dialogRef: MatDialogRef<PlacesDialog>;

    addNewForm: FormGroup;
    detailsForm: FormGroup;

    newForm: boolean;
    currentPlace: IPlace;
    modalHeaderText: string;

    private toasterService: ToasterService;

    constructor(private _fb: FormBuilder,
                toasterService: ToasterService,
                public dialog: MatDialog) {
        this.toasterService = toasterService;
    }

    ngOnDestroy(): void {
    }


    ngOnInit() {
        this.getPlaces();
    }

    openDialog(item?): void {
        this.dialogRef = this.dialog.open(PlacesDialog, {
            data: {
                title: item ? item.title[0].text : '',
                placeholder: item ? item.placeholder[0].text : ''
            }
        });

        this.dialogRef
            .afterClosed()
            .filter(values => values)
            .subscribe(values => {
                if (item) {
                    item.title[0].text = values.title;
                    item.placeholder[0].text = values.placeholder;

                    MeteorObservable.call('updatePlace', item).subscribe({
                        next: () => {
                            //this.toasterService.pop('success', 'Args Title', "");
                        },
                        error: (e: Error) => {
                            console.log(e);
                            this.toasterService.pop({
                                type: 'error',
                                body: e.message,
                                showCloseButton: true
                            });
                        }
                    });
                } else {
                    let place: IPlace = {
                        isActive: true,
                        title: [{ language: 'en', text: values.title }],
                        placeholder: [{ language: 'en', text: values.placeholder }],
                    };

                    MeteorObservable.call('addLPlace', place).subscribe({
                        next: () => {
                            //this.toasterService.pop('success', 'Args Title', "");
                        },
                        error: (e: Error) => {
                            console.log(e);
                            this.toasterService.pop({
                                type: 'error',
                                body: e.message,
                                showCloseButton: true
                            });
                        }
                    });
                }
            });
    }

    delete(place: IPlace): void {
        if (place) {
            MeteorObservable.call('removePlace', place).subscribe({
                next: () => {
                    //this.getPlaces();
                },
                error: (e: Error) => {
                    console.log(e);
                    this.toasterService.pop({
                        type: 'error',
                        body: e.message,
                        showCloseButton: true
                    });
                }
            });
        }
    }

    getPlaces() {
        //console.log("getPlaces");
        MeteorObservable.subscribe('places').takeUntil(componentDestroyed(this)).subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.list = this.findPlaces();
            });
        });
    }

    findPlaces(): Observable<IPlace[]> {
        return Places.find();
    }
}