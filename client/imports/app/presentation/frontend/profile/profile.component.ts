import {Component, OnDestroy, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';

@Component({
    styleUrls: ['./profile.component.scss'],
    templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit, OnDestroy {

    user = Meteor.user();
    constructor(){

    }

    ngOnInit() {

    }


    ngOnDestroy() {
    }

}
