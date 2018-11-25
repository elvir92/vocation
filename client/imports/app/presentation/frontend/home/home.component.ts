import {Component, OnDestroy, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import { IProperty } from 'imports/models';
import { MeteorObservable } from 'meteor-rxjs';
import { componentDestroyed } from 'ng2-rx-componentdestroyed';
import { Properties } from 'imports/collections';
import * as _ from 'lodash'; 


@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
    host: {
        '(window:resize)': 'onResize()'
    }
})

export class HomeComponent implements OnInit, OnDestroy {
    headerContainerHeight: Number;

    properties: IProperty[];
    filtered: IProperty[];

    constructor(){

    }

    ngOnInit() {
        this.headerContainerHeight = window.innerHeight;
        this.filtered = [];
        this.getProperties();
    }

    onResize() {
        this.headerContainerHeight = window.innerHeight;
    }

    ngOnDestroy() {
    }

    onSearch(filter) {
        this.filtered = [];
        let searchObj = this.properties.map((prop, index) => {
            return {
                index: index,
                descriptions: prop.description.map(elem => elem.text).join(','),
                city: prop.geoLocation.city,
                country: prop.geoLocation.country,
                headlines: prop.headline.map(elem => elem.text).join(','),
                names: prop.name.map(elem => elem.text).join(',')
            }
        });

        let res = this.filterByValue(searchObj, filter.searchQuery).map(elem => elem.index);

        res.forEach(index => {
            this.filtered.push(this.properties[index]);
        })

        console.log(this.filtered);
        
    }

    private filterByValue (object, value) {
        return _.filter(object, _.flow(_.values, _.partialRight(_.some, _.method('match', new RegExp(value, 'i')))));
    };

    private getProperties() {
        MeteorObservable.subscribe('frontend-properties').takeUntil(componentDestroyed(this)).subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.properties = this.findProperties();
            });
        });
    }

    private findProperties(): IProperty[] {
        return Properties.find().fetch();
    }

}
