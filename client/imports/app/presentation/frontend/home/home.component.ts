import {Component, OnDestroy, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import { IProperty } from 'imports/models';
import { MeteorObservable } from 'meteor-rxjs';
import { componentDestroyed } from 'ng2-rx-componentdestroyed';
import { Properties } from 'imports/collections';
import * as _ from 'lodash'; 
import { IReservations } from 'imports/models/reservations';
import { Reservations } from 'imports/collections/reservations';
import * as moment from 'moment';

const formatDate = "DDMMYYYY";
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
    reservations: IReservations[];
    filtered: IProperty[];
    filterOn: boolean;

    constructor(){

    }

    ngOnInit() {
        this.headerContainerHeight = window.innerHeight;
        this.filtered = [];
        this.getProperties();
        this.getReservations();
    }

    onResize() {
        this.headerContainerHeight = window.innerHeight;
    }

    ngOnDestroy() {
    }

    onSearch(filter) {
        this.filtered = [];

        if (!filter.validation_error) {
            this.filterOn = true;
            let reservationsInScope = this.reservations.filter(reservation => {
                return moment(filter.startDate).format(formatDate) >= moment(reservation.from).format(formatDate) &&  moment(filter.startDate).format(formatDate) <= moment(reservation.to).format(formatDate) ||
                            moment(filter.endDate).format(formatDate) >= moment(reservation.from).format(formatDate) && moment(filter.endDate).format(formatDate) <= moment(reservation.to).format(formatDate) || 
                            moment(filter.startDate).format(formatDate) >= moment(reservation.from).format(formatDate) && moment(filter.endDate).format(formatDate) <= moment(reservation.to).format(formatDate);
            }).map(res => res.propertyId);
            let outOfDateScope = this.properties.filter(prop => reservationsInScope.indexOf(prop._id) == -1)

            if (filter.searchQuery || filter.numOfGuests) {
                if (filter.numOfGuests > 0) {
                    outOfDateScope = outOfDateScope.filter(prop => filter.numOfGuests <= prop.maxGuest);
                }
                if (filter.searchQuery != "") {
                    let searchObj = outOfDateScope.map((prop, index) => {
                        return {
                            index: index,
                            city: prop.geoLocation.city,
                            country: prop.geoLocation.country,
                            headlines: prop.headline.map(elem => elem.text).join(','),
                            names: prop.name.map(elem => elem.text).join(',')
                        };
                    });
                    let res = this.filterByValue(searchObj, filter.searchQuery).map(elem => elem.index);
                    res.forEach(index => {
                        this.filtered.push(outOfDateScope[index]);
                    })
                } else {
                    this.filtered = outOfDateScope;
                }
            } else {
                this.filtered = outOfDateScope;
            }
        }
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

    private getReservations() {
        MeteorObservable.subscribe('search-component-reservations').takeUntil(componentDestroyed(this)).subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.reservations = this.findReservations();
            });
        });
    }

    private findProperties(): IProperty[] {
        return Properties.find().fetch();
    }

    private findReservations(): IReservations[] {
        return Reservations.find().fetch();
    }

}
