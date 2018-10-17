import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { MeteorObservable } from 'meteor-rxjs';
import { componentDestroyed } from "ng2-rx-componentdestroyed";
import { IAddress } from '../../../../../../imports/models';
import { Addresses } from "../../../../../../imports/collections/addresses";
import { ActivatedRoute } from '@angular/router';

@Component({
    styleUrls: ['./accommodation.component.scss'],
    templateUrl: './accommodation.component.html'
})

export class AccommodationComponent implements OnInit, OnDestroy {
    addresses: Observable<IAddress[]>;
    sub: any;
    accommodationType: any;
    selected = '1';

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.getAddresses();
        this.sub = this.route.params.subscribe(params => {
            this.accommodationType = params['accommodation'];
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getAddresses() {
        MeteorObservable.subscribe('addresses').takeUntil(componentDestroyed(this)).subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.addresses = this.findAddresses();
            });
        });
    }

    findAddresses(): Observable<IAddress[]> {
        return Addresses.find();
    }
}
