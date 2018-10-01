import { CitiesDialog } from './cities-dialog.component';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {City} from '../../../../../../../imports/models';
import {Cities} from "../../../../../../../imports/collections/cities";
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
    templateUrl: './cities.component.html',
    styleUrls: ['./cities.component.scss']
})

export class CitiesComponent implements OnInit, OnDestroy {
    list: Observable<City[]>;
    dialogRef: MatDialogRef<CitiesDialog>;

    addNewForm: FormGroup;
    detailsForm: FormGroup;

    newForm: boolean;
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
        this.getCities();
    }

    openDialog(item?): void {
        this.dialogRef = this.dialog.open(CitiesDialog, {
            data: {
                cityName: item ? item.cityName : '',

            }
        });

        this.dialogRef
            .afterClosed()
            .filter(values => values)
            .subscribe(values => {
                if (item) {
                    item.cityName = values.cityName;
                    MeteorObservable.call('updateCity', item).subscribe({
                        next: () => {
                            this.toasterService.pop('success', 'Args Title', "");
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
                    let city: City = {
                        cityName: values.cityName
                    };

                    MeteorObservable.call('addCity', city).subscribe({
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

    delete(city: City): void {
        if (city) {
            MeteorObservable.call('removeCity', city).subscribe({
                next: () => {

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

    getCities() {
        MeteorObservable.subscribe('cities').takeUntil(componentDestroyed(this)).subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.list = this.findCities();
            });
        });
    }

    findCities(): Observable<City[]> {
        return Cities.find();
    }
}
