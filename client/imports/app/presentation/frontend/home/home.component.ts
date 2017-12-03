import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {IProperty, IPropertyPictures} from "../../../../../../imports/models/property";
import {MeteorObservable} from 'meteor-rxjs';
import {Properties} from "../../../../../../imports/collections/properties";
import {Pictures} from "../../../../../../imports/collections/pictures";
import {componentDestroyed} from "ng2-rx-componentdestroyed";


@Component({
    templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit, OnDestroy {
    list: Observable<IPropertyPictures[]>;

    constructor() {
    }

    ngOnInit() {
        MeteorObservable.subscribe('properties').takeUntil(componentDestroyed(this)).subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                //this.listGroups = this.findListGroups(options);
                this.list = this.findProperties();
            });
        });
    }

    findProperties(): Observable<IPropertyPictures[]> {
        return Properties.find({}).map((items: IProperty[]) => {
            let lst: IPropertyPictures[] = [];
            items.forEach((item: IProperty) => {
                let tmp: IPropertyPictures = {
                    property: item,
                    pictures: Pictures.find({_id: {$in: item.images}}).fetch()
                };
                lst.push(tmp);
            });
            return lst;
        });
    }

    ngOnDestroy() {
    }

}