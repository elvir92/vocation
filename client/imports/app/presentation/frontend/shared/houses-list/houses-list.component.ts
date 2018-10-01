import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {IProperty, IPropertyPictures} from "../../../../../../imports/models/property";
import {MeteorObservable} from 'meteor-rxjs';
import {componentDestroyed} from "ng2-rx-componentdestroyed";
import {IPlace} from '../../../../../../../imports/models';
import {Places} from "../../../../../../../imports/collections";

@Component({
    selector: 'houses-list',
    styleUrls: ['./houses-list.component.scss'],
    templateUrl: './houses-list.component.html'
})

export class HousesListComponent implements OnInit, OnDestroy {
    list: Observable<IPlace[]>;


    constructor(){

    }

    ngOnInit() {
      this.getPlaces();
    }


    ngOnDestroy() {
    }

    getPlaces() {
        MeteorObservable.subscribe('places').takeUntil(componentDestroyed(this)).subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.list = this.findPlaces();
                console.log(this.list)
            });
        });
    }
    findPlaces(): Observable<IPlace[]> {
        return Places.find();
    }
}
