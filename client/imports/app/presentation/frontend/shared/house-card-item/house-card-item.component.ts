import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {IPlace} from '../../../../../../../imports/models';

@Component({
    selector: 'house-card-item',
    styleUrls: ['./house-card-item.component.scss'],
    templateUrl: './house-card-item.component.html'
})

export class HouseCardItemComponent implements OnInit, OnDestroy {

    @Input()
    data: IPlace;


    constructor(){

    }

    ngOnInit() {
    }


    ngOnDestroy() {
    }

}
