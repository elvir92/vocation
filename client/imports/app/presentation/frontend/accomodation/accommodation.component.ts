import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {MeteorObservable} from 'meteor-rxjs';
import {componentDestroyed} from "ng2-rx-componentdestroyed";
import {City} from '../../../../../../imports/models';
import {Cities} from "../../../../../../imports/collections/cities";
import { ActivatedRoute } from '@angular/router';

@Component({
    styleUrls: ['./accommodation.component.scss'],
    templateUrl: './accommodation.component.html'
})

export class AccommodationComponent implements OnInit, OnDestroy {
    cities: Observable<City[]>;
    sub: any;
    accommodationType: any;
    selected = '1';

    constructor(private route:ActivatedRoute){

    }

    ngOnInit() {
        this.getCities();
        this.sub = this.route.params.subscribe(params => {
            this.accommodationType = params['accommodation'];
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    getCities() {
        MeteorObservable.subscribe('cities').takeUntil(componentDestroyed(this)).subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.cities = this.findCities();
            });
        });
    }
    findCities(): Observable<City[]> {
        return Cities.find();
    }
}
