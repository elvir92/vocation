import {Component, OnDestroy, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {IGroup} from '../../../../../../../imports/models';

@Component({
    selector: 'group-list',
    styleUrls: ['./group-list.component.scss'],
    templateUrl: './group-list.component.html'
})

export class GroupListComponent implements OnInit, OnDestroy {
    list: IGroup[];


    constructor(){

    }

    ngOnInit() {
      this.getGroups();
    }


    ngOnDestroy() {
    }

    getGroups() {
        // MeteorObservable.subscribe('groups').takeUntil(componentDestroyed(this)).subscribe(() => {
        //     MeteorObservable.autorun().subscribe(() => {
        //         this.list = this.findPlaces();
        //         console.log(this.list)
        //     });
        // });
        this.list = [{_id:'1',title:"Beach Rentals",imageUrl:'/assets/img/hr.jpeg'},{_id:'2',title:"City Rentals",imageUrl:'/assets/img/zagreb.jpg'},{_id:'3',title:"Country Homes",imageUrl:'/assets/img/country_cabin.jpg'},{_id:'4',title:"Mountain Cabins",imageUrl:'/assets/img/mountain_cabin.jpg'}];

    }

}
