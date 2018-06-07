import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {IProperty, IPropertyPictures} from "../../../../../../imports/models/property";
import {MeteorObservable} from 'meteor-rxjs';
import {IPlace} from '../../../../../../../imports/models';

@Component({
    selector: 'house-card-item',
    styleUrls: ['./house-card-item.component.scss'],
    templateUrl: './house-card-item.component.html'
})

export class HouseCardItemComponent implements OnInit, OnDestroy {

    @Input()
    data: Iplace;


    constructor(){

    }

    ngOnInit() {

    }


    ngOnDestroy() {
    }

}
