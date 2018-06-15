import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {IProperty, IPropertyPictures} from "../../../../../../imports/models/property";
import {MeteorObservable} from 'meteor-rxjs';
import {componentDestroyed} from "ng2-rx-componentdestroyed";
import {City} from '../../../../../../imports/models';
import {Cities} from "../../../../../../imports/collections/cities";

@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home-temp.component.html'
})

export class HomeComponent implements OnInit, OnDestroy {
    cities: Observable<City[]>;

    selected = '1';
    selected1 = '2';

    constructor(){

    }

    ngOnInit() {
      this.getCities();
    }
    ngOnDestroy() {
    }
    getCities() {
        MeteorObservable.subscribe('cities').takeUntil(componentDestroyed(this)).subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.cities = this.findCities();
            });
        });
    }
    findCities(): Observable<City[]> {
        console.log(Cities.find());
        return Cities.find();
    }
}
