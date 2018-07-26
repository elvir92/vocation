import {Component, OnDestroy, OnInit, Input} from '@angular/core';
import 'rxjs/add/operator/map';
import {Group} from '../../../../../../../imports/models';
import { Router } from '@angular/router';

@Component({
    selector: 'group-card-item',
    styleUrls: ['./group-item.component.scss'],
    templateUrl: './group-item.component.html'
})

export class GroupItemComponent implements OnInit, OnDestroy {

    @Input()
    data: Group;


    constructor(private router:Router){

    }

    ngOnInit() {
    }


    ngOnDestroy() {
    }
    public selectAccomodation = (accommodation) => {
       this.router.navigate(['front/accommodation', { accommodation: accommodation }]);

    }
}
