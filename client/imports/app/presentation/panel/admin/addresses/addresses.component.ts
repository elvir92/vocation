import { AddressesDialog } from './addresses-dialog.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAddress } from '../../../../../../../imports/models';
import { Addresses } from "../../../../../../../imports/collections/addresses";
import { Observable } from 'rxjs/Observable';
import { MeteorObservable } from 'meteor-rxjs';
import 'rxjs/add/operator/combineLatest';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToasterService } from "angular2-toaster";
import { componentDestroyed } from "ng2-rx-componentdestroyed";
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
    //selector: 'app-dashboard',
    templateUrl: './addresses.component.html',
    styleUrls: ['./addresses.component.scss']
})

export class AddressesComponent implements OnInit, OnDestroy {
    list: Observable<IAddress[]>;
    dialogRef: MatDialogRef<AddressesDialog>;

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
        //TODO: Make one unique list with country name and array of cities
        this.getAddresses();
    }

    openDialog(item?): void {
        this.dialogRef = this.dialog.open(AddressesDialog, {
            data: {
                city: item ? item.city : '',
            }
        });

        this.dialogRef
            .afterClosed()
            .filter(values => values)
            .subscribe(values => {
                if (item) {
                    item.city = values.city;
                    MeteorObservable.call('updateAddress', item).subscribe({
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
                    let address: IAddress = {
                        city: values.city,
                        country:null
                    };

                    MeteorObservable.call('addAddress', address).subscribe({
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

    delete(address: IAddress): void {
        if (address) {
            MeteorObservable.call('removeAddress', address).subscribe({
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

    getAddresses() {
        MeteorObservable.subscribe('addresses').takeUntil(componentDestroyed(this)).subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                return this.findAddresses();});
        });
    }

    findAddresses(): Observable<IAddress[]> {                
        return Addresses.find();
    }
}
