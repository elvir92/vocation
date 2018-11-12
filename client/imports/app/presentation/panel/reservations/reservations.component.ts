import { Properties } from './../../../../../../imports/collections/properties';
import { Reservations } from 'imports/collections/reservations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MeteorObservable } from 'meteor-rxjs';
import 'rxjs/add/operator/combineLatest';
import { FormBuilder } from "@angular/forms";
import { ToasterService } from "angular2-toaster";
import { componentDestroyed } from "ng2-rx-componentdestroyed";
import { MatDialog, MatDialogRef } from '@angular/material';
import { IReservations } from 'imports/models/reservations';
import { ReservationsDialog } from './reservations-dialog.component';
import { IProperty } from 'imports/models';

@Component({
    templateUrl: './reservations.component.html',
    styleUrls: ['./reservations.component.scss']
})

export class ReservationsComponent implements OnInit, OnDestroy {
    list: Observable<IReservations[]>;
    // TODO: fetch properties in format PropertyId && name. For now it can stay this.
    properties: IProperty[];

    currentReservation: IReservations;
    private toasterService: ToasterService;
    dialogRef: MatDialogRef<ReservationsDialog>;


    constructor(private formBuilder: FormBuilder,
        toasterService: ToasterService,
        public dialog: MatDialog) {
        this.toasterService = toasterService;
    }

    ngOnInit() {
        this.getReservations();
        this.getProperties();
    }

    ngOnDestroy(): void {
    }

    openDialog(item?): void {
        this.dialogRef = this.dialog.open(ReservationsDialog, {
            data: {
                propertyId: item ? item.propertyId : '',
                from: item ? item.from : '',
                to: item ? item.to : '',
                status: item ? item.status : '',
                properties: this.properties
            }
        });

        this.dialogRef
            .afterClosed()
            .filter(values => values)
            .subscribe(values => {
                if (item) {
                    item.propertyId = values.propertyId;
                    item.from = values.from;
                    item.to = values.to;
                    item.status = values.status;

                    MeteorObservable.call('updateReservation', item).subscribe({
                        next: () => {
                        },
                        error: (e: Error) => {
                            console.log(e);
                            this.toasterService.pop('error', '', e.message);
                        }
                    });
                } else {
                    let reservation: IReservations = {
                        propertyId: values.propertyId,
                        from: values.from,
                        to: values.to,
                        status: values.status
                    };

                    MeteorObservable.call('addReservation', reservation).subscribe({
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

    delete(Reservation: IReservations): void {
        if (Reservation) {
            MeteorObservable.call('removeReservation', Reservation).subscribe({
                next: () => {
                    this.getReservations();
                },
                error: (e: Error) => {
                    console.log(e);
                    this.toasterService.pop('error', '', e.message);
                }
            });
        }
    }

    getReservations() {
        MeteorObservable.subscribe('reservations').takeUntil(componentDestroyed(this)).subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.list = this.findReservations();
            });
        });
    }

    getProperties() {
        MeteorObservable.subscribe('all-properties').takeUntil(componentDestroyed(this)).subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.properties = this.findProperties();
            });
        });
    }

    findReservations(): Observable<IReservations[]> {
        return Reservations.find();
    }

    findProperties(): IProperty[] {
        // search for active properties
        // return Properties.find({ isActive: true, isEditMode: false }).fetch();
        return Properties.find().fetch();
    }

}