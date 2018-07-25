import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import 'rxjs/add/operator/map';
import {Group} from '../../../../../../../imports/models';

@Component({
    selector: 'group-card-item',
    styleUrls: ['./group-item.component.scss'],
    templateUrl: './group-item.component.html'
})

export class GroupItemComponent implements OnInit, OnDestroy {

    @Input()
    data: Group;


    constructor(){

    }

    ngOnInit() {
    }


    ngOnDestroy() {
    }
    public setPerson = (person) => {
       alert("Kliknuo si");
    }
}
