import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {IProperty, IPropertyPictures} from "../../../../../../imports/models/property";
import {MeteorObservable} from 'meteor-rxjs';

@Component({
    styleUrls: ['./home-temp.component.scss'],
    templateUrl: './home-temp.component.html'
})

export class HomeTempComponent implements OnInit, OnDestroy {

    selected = '1';
    selected1 = '2';

    constructor(){

    }

    ngOnInit() {

    }


    ngOnDestroy() {
    }

}
