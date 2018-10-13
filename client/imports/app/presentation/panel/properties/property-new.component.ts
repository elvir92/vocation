import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MeteorObservable } from 'meteor-rxjs';
import { Observable } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { City } from './../../../../../../imports/models/city';
import { MapsAPILoader } from "@agm/core";
import {
    IPicture,
    IListing,
    IListGroup,
    IProperty,
    IList,
    IPlace,
    ILengthUnit,
    ILocation
} from '../../../../../../imports/models';
import { Pictures, ListsGroups, Lists, Places, LengthUnits } from "../../../../../../imports/collections";

import { Router } from "@angular/router";
import { componentDestroyed } from "ng2-rx-componentdestroyed";

@Component({
    //selector: 'app-',
    templateUrl: './property-new.component.html',
    //styleUrls: ['./property-new.component.scss']template
})

export class PropertyNewComponent implements OnInit, OnDestroy {
    // TODO: Trebalo bi napraviti cim prvi put klikne na next, da se kreira proeprty kao draft,
    // zatim da se url promjeni tako da ima ID, u slucaju refresha stranice da se ne izgube podaci.
    // Tako da se moze nastaviti kao pravi draft.
    isLinear = true;

    locationValidation = false;

    listing: Observable<IListing[]>;
    pictures: Observable<IPicture[]>;
    places: IPlace[];
    lengthUnits: ILengthUnit[];

    geocodedCity: City;

    pricing = [];
    basePrice = new FormControl();

    periodName = new FormControl();
    startPricePeriod = new FormControl();
    endPricePeriod = new FormControl();
    valuePricePeriod = new FormControl();

    propertyForm: FormGroup;
    descriptionForm: FormGroup;

    property: IProperty = {
        location: {
            longitude: 0,
            latitude: 0
        },
        activities: [],
        images: [],
        places: [],
        isActive: false,
        isEditMode: true
    };


    startDate = new Date(1990, 0, 1);
    date = new FormControl(new Date());
    serializedDate = new FormControl((new Date()).toISOString())
    minDate = new Date(2000, 0, 1);
    maxDate = new Date(2020, 0, 1);
    events: string[] = [];
    myFilter = (d: Date): boolean => {
        const day = d.getDay();

        return day !== 0 && day !== 6;
    };


    constructor(private _fb: FormBuilder, private router: Router, private mapsAPILoader: MapsAPILoader) {
        //console.log("properties const");
    }

    ngOnInit() {
        this.getListing();
        this.getLengthUnits();
        this.getPlaces();
        this.getPictures();

        this.propertyForm = this._fb.group({
            places: this._fb.array([])
        });

        this.descriptionForm = this._fb.group({
            propertyName: ['', Validators.required],
            propertyHeadline: ['', Validators.required],
            propertySummary: ['', Validators.required],
            propertyDescription: ['', Validators.required],
        });

    }

    ngOnDestroy(): void {
    }

    addNewPeriodPrice() {
        //TODO: Validirati period da li je vec dodan
        const price = {
            name: this.periodName.value,
            start: this.startPricePeriod.value,
            end: this.endPricePeriod.value,
            value: this.valuePricePeriod.value
        };
        let isValid = this.checkIfDateIsValid(price.start, price.end);
        if(isValid){
            this.pricing.push(price); 
            //TODO: make reset function
            this.startPricePeriod.reset();           
            this.endPricePeriod.reset();           
            this.periodName.reset();           
            this.valuePricePeriod.reset();           
        }
        //TODO: add toast notification
    }

    removePrice(price){
        let i = this.pricing.findIndex( p => p === price);
        this.pricing.splice(i, 1);
    }

    onImage(imageId: string) {
        this.property.images.push(imageId);
        this.findPictures();
    }

    deletePicture(image: IPicture) {
        MeteorObservable.call("removePicture", image).subscribe({
            next: () => {
            },
            error: (e: Error) => {
                console.log(e);
            }
        });
    }

    onChangeList(list: IList, isChecked: boolean) {
        if (isChecked) {
            this.property.activities.push(list._id);
        } else {
            let index = this.property.activities.indexOf(list._id);
            this.property.activities.splice(index, 1);
        }
    }

    onChangeLocation(location: ILocation) {
        this.property.location = location;
        this.onReverseGeocode(location);
    }

    onReverseGeocode(latlong) {
        let lat = latlong.latitude;
        let long = latlong.longitude;


        this.mapsAPILoader.load().then(() => {
            let geocoder = new google.maps.Geocoder;
            let latlng = { lat: lat, lng: long };
            geocoder.geocode({ 'location': latlng }, function (results, status) {
                if (results[0]) {
                    let country = results[0].address_components.filter(value => {
                        if (value.types.some(type => type === 'country')) {
                            return value;
                        } 
                    });
                    let city = results[0].address_components.filter(value => {
                        if (value.types.some(type => type === 'locality')) {
                            return value;
                        }
                    })

                    let geocodedCity = {
                        cityName: city[0].long_name,
                        country: country[0].long_name
                    }
                // postaviti gornji geocodecity na ovaj nekako
                    this.geocodedCity = geocodedCity;
                }
            });
        })
    }

    addCity() {
        console.log("Saving city ", this.geocodedCity);
        MeteorObservable.call('addCity', this.geocodedCity).subscribe({
            next: () => {
                console.log('City saved')
            },
            error: (e: Error) => {
                console.log(e);
            }
        });
    }

    addOrSaveProperty() {
        this.addCity();
        this.setPropertyObject();
        const methodName = this.property._id ? 'updateProperty' : 'insertProperty';
        MeteorObservable.call(methodName, this.property).subscribe({
            next: (propertyId: string) => {
                this.property._id = propertyId;
                // console.log("addOrSaved id : ", this.property._id);
            },
            error: (e: Error) => {
                console.log(e);
            }
        });
    }

    saveProperty() {
        this.property.isEditMode = false;
        this.property.isActive = true;
        this.addOrSaveProperty();

        this.router.navigate(['/properties']);
    }

    //---------------------------------PRIVATE FUNCTIONS--------------------------------
    private checkIfDateIsValid(start,end): Boolean {
        let valid = true;
        for (let i = 0; i < this.pricing.length; i++) {
            const price = this.pricing[i];
            if ((start >= price.start && start <= price.end) || (end >= price.start && end <= price.end)) {
                valid = false;
                return;
            }
        }
        return valid;
    }

    private setPropertyObject(): void {
        this.property.name = [{ text: this.descriptionForm.value.propertyName, language: 'en' }];
        this.property.headline = [{ text: this.descriptionForm.value.propertyHeadline, language: 'en' }];
        this.property.summary = [{ text: this.descriptionForm.value.propertySummary, language: 'en' }];
        this.property.description = [{ text: this.descriptionForm.value.propertyDescription, language: 'en' }];

        for (let i in this.propertyForm.value.places) {
            let plVal = this.propertyForm.value.places[i];
            if (plVal.title) {
                const lngthObj = this.lengthUnits.find(obj => obj._id == plVal.distanceType);
                this.property.places.push({
                    title: [{ text: plVal.title, language: 'en' }],
                    distanceType: lngthObj ? lngthObj : plVal.distanceType,
                    placeId: plVal.placeId,
                    distanceValue: plVal.distanceValue
                });
            }
        }
    }

    private initPlaceForm(placeId: string) {
        // initialize place form object
        //For select first item is default. . .
        return this._fb.group({
            placeId: placeId,
            title: '',
            distanceValue: [''],
            distanceType: this.lengthUnits[0]._id,
        });
    }

    private addPlaceToForm(placeId: string) {
        // add place to the list
        const control = <FormArray>this.propertyForm.controls['places'];
        control.push(this.initPlaceForm(placeId));
    }

    private getPictures() {
        MeteorObservable.subscribe('pictures').takeUntil(componentDestroyed(this)).subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.findPictures();
            });
        });
    }

    private findPictures() {
        this.pictures = Pictures.find({ _id: { $in: this.property.images } });
    }

    private getListing() {
        MeteorObservable.subscribe('listing').takeUntil(componentDestroyed(this)).subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.listing = this.findListing();
            });
        });

    }

    private findListing(): Observable<IListing[]> {
        // console.log("Get listing JOIN!!")
        return ListsGroups.find({ isActive: true }).map((items: IListGroup[]) => {
            let lst: IListing[] = [];
            items.forEach((item: IListGroup) => {
                let tmp: IListing = {
                    lists: Lists.find({ parentId: item._id }).fetch(),
                    listGroup: item
                };
                lst.push(tmp);
            });
            return lst;
        });
    }

    private getPlaces() {
        MeteorObservable.subscribe('places').takeUntil(componentDestroyed(this)).subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.places = this.findPlaces();

                //append to form
                Places.find().fetch().forEach((place: IPlace) => {
                    this.addPlaceToForm(place._id);
                });
            });
        });
    }

    private findPlaces(): IPlace[] {
        return Places.find().fetch();
    }

    private getLengthUnits() {
        MeteorObservable.subscribe('length-units').takeUntil(componentDestroyed(this)).subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.lengthUnits = this.findLengthUnits();
            });
        });
    }

    private findLengthUnits(): ILengthUnit[] {
        return LengthUnits.find().fetch();
    }

    /*
        findLists(): Observable<IListGroup[]> {
            return ListsGroups.find().map(items => {
                items.forEach(item => {
                    // item.lists = Lists.find({parentId: item._id}).fetch();
                });
                return items;
            });
        }*/
}