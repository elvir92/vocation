import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MeteorObservable } from 'meteor-rxjs';
import { Observable } from 'rxjs/Observable';
import { componentDestroyed } from 'ng2-rx-componentdestroyed';

import { LandingFixService } from '../_layout/shared/services/landing-fix.service';
import { IApartment, IProperty, IPlace, IReservations, IPropertyType } from 'imports/models';
import { Properties, Pictures, PropertyTypes, Places, Reservations } from 'imports/collections';

import * as _ from 'lodash';
import * as moment from 'moment';


const formatDate = "DDMMYYYY";

@Component({
  selector: 'app-home-one',
  templateUrl: './home-one.component.html'
})
export class HomeOneComponent implements OnInit, OnDestroy {
  filterOn = false;
  apartments: IApartment[];
  reservations: IReservations[];
  
  propertyTypes:IPropertyType[];
  places:IPlace[];

  constructor(
    private fix: LandingFixService
  ) { }

  ngOnInit() {
    this.fix.addFix();
    this.getPlaces();
    this.getPropertyTypes();
    // this.getReservations();
    this.getApartments();
  }

  ngOnDestroy() {
    this.fix.removeFix();
  }

  // onSearchSubmit(filter) {
    // this.filterOn = true;
    // if (props.length > 0) {
      // this.properties = props;
    // } else {
      // this.properties = [];
    // }
  // }

  onSearchSubmit(filter) {    
    if (!filter.validation_error) {      
      let filtered = [];
      this.filterOn = true;
      let properties = Properties.find({isActive:true}).fetch();

      let reservationsInScope = this.reservations.filter(reservation => {
        return moment(filter.startDate).format(formatDate) >= moment(reservation.from).format(formatDate) && moment(filter.startDate).format(formatDate) <= moment(reservation.to).format(formatDate) ||
          moment(filter.endDate).format(formatDate) >= moment(reservation.from).format(formatDate) && moment(filter.endDate).format(formatDate) <= moment(reservation.to).format(formatDate) ||
          moment(filter.startDate).format(formatDate) >= moment(reservation.from).format(formatDate) && moment(filter.endDate).format(formatDate) <= moment(reservation.to).format(formatDate);
      }).map(res => res.propertyId);

      let outOfDateScope = properties.filter(prop => reservationsInScope.indexOf(prop._id) == -1)

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
            filtered.push(outOfDateScope[index]);
          })
        } else {
          filtered = outOfDateScope;
        }
      } else {
        filtered = outOfDateScope;
      }            
      this.apartments = this.findApartments(filtered.map(x => x._id));      
    }
    
  }

  private filterByValue(object, value) {
    return _.filter(object, _.flow(_.values, _.partialRight(_.some, _.method('match', new RegExp(value, 'i')))));
  };

  //====================================================MONGO===============================
  private getPropertyTypes() {
    MeteorObservable.subscribe('property-types').takeUntil(componentDestroyed(this)).subscribe(() => {
      MeteorObservable.autorun().subscribe(() => {
        this.propertyTypes = PropertyTypes.find().fetch();
      });
    });
  }

  private getPlaces() {
    MeteorObservable.subscribe('places').takeUntil(componentDestroyed(this)).subscribe(() => {
      MeteorObservable.autorun().subscribe(() => {
        this.places = Places.find().fetch();        
      });
    });
  }

  private getApartments() {
    MeteorObservable.subscribe('frontend-properties').takeUntil(componentDestroyed(this)).subscribe(() => {
      MeteorObservable.autorun().subscribe(() => {
        //fetch all related reservations
        this.findReservations();
        this.apartments = this.findApartments(null);           
      });
    });
  }
  
  private findReservations() {    
    this.reservations = Reservations.find().fetch();
  }
  
  private findApartments(filterIds): IApartment[] {
    let filter = { isActive: true };
    if (filterIds && filterIds.length > 0) {
      filter['_id'] = { $in: filterIds };
    }
    
    console.log(filter);    

    return Properties.find(filter).fetch().map((item: IProperty) => {
      return {
        property: item,
        pictures: Pictures.find({ _id: { $in: item.images }, isActive: true }).fetch(),
        type: PropertyTypes.findOne({ _id: item.propertyTypeId }),
        reservations: Reservations.find({ propertyId: item._id, status: { $in: ['Hold', 'Reserved'] } }).fetch()
      };
    });
  }

  // private findApartments(): Observable<IApartment[]> {
  //   return Properties.find({ isActive: true }).map((items: IProperty[]) => {
  //     let apartments: IApartment[] = [];
  //     items.forEach((item: IProperty) => {
  //       let tmp: IApartment = {
  //         property: item,
  //         pictures: Pictures.find({ _id: { $in: item.images }, isActive: true }).fetch(),
  //         type: PropertyTypes.findOne({ _id: item.propertyTypeId })
  //       };        
  //       apartments.push(tmp);        
  //     });
  //     return apartments;
  //   });        
  // }
}