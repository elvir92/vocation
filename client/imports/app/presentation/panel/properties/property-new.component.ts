import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MeteorObservable } from 'meteor-rxjs';
import { Observable } from 'rxjs';
import { MapsAPILoader } from "@agm/core";
import { componentDestroyed } from "ng2-rx-componentdestroyed";

import {
    IPicture,
    IListing,
    IListGroup,
    IProperty,
    IList,
    IPlace,
    ILengthUnit,
    ILocation,
    IAddress,
    IPropertyType,
    IPropertyPrice
} from '../../../../../../imports/models';
import { Pictures, ListsGroups, Lists, Places, LengthUnits, PropertyTypes } from "../../../../../../imports/collections";

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

    listing: Observable<IListing[]>;
    pictures: Observable<IPicture[]>;
    places: IPlace[];
    lengthUnits: ILengthUnit[];
    propertyTypes: IPropertyType[];
    //main object to save
    property: IProperty = {
        propertySize:0,
        maxGuest:0,
        geoLocation: {
            longitude: null,
            latitude: null,
            formattedAddress: '',
            mapObject: null,
            city: null,
            country: null
        },
        activities: [],
        images: [],
        pricing: [],
        places: [],
        isActive: false,
        isEditMode: true
    };
    // geocodedCity: IAddress = { city: null, country: null }; //releted with addAddress method

    //forms for validating wizard    
    locationForm:FormGroup;
    detailForm:FormGroup;
    priceForm:FormGroup;
    
    propertyForm: FormGroup;
    // descriptionForm: FormGroup;


    constructor(private _fb: FormBuilder, private router: Router, private mapsAPILoader: MapsAPILoader) {
        //console.log("properties const");
    }

    ngOnInit() {
        this.getListing();
        this.getLengthUnits();
        this.getPlaces();
        this.getPictures();
        this.getPropertyTypes();

        this.propertyForm = this._fb.group({
            places: this._fb.array([]),            
            basePrice: ['', Validators.required],            
        });
        
        this.locationForm = this._fb.group({
            propertyType: ['', Validators.required],
            longitude: ['', Validators.required],
            latitude: ['', Validators.required]
        });
        
        this.detailForm = this._fb.group({
            propertyName: ['', Validators.required],
            propertyHeadline: ['', Validators.required],
            propertySummary: ['', Validators.required],
            propertyDescription: ['', Validators.required],
            bedroomDescription: [''],
            bathroomDescription: [''],            
            propertySize: ['', Validators.required],            
            maxGuest: ['', Validators.required],
        });

        this.priceForm = this._fb.group({
            basePrice: ['', Validators.required],
            periodName: [''],
            startPricePeriod: [''],
            endPricePeriod: [''],
            valuePricePeriod: [''],
        })

    }

    ngOnDestroy(): void {
    }

    addNewPeriodPrice() {
        //TODO: Validirati period da li je vec dodan
        const price: IPropertyPrice = {
            name: this.priceForm.value.periodName,
            start: this.priceForm.value.startPricePeriod,
            end: this.priceForm.value.endPricePeriod,
            value: this.priceForm.value.valuePricePeriod
        };
        let isValid = this.checkIfDateIsValid(price.start, price.end);
        if (isValid) {
            this.property.pricing.push(price);
            //TODO: make reset function
            this.priceForm.controls['periodName'].reset();
            this.priceForm.controls['startPricePeriod'].reset();
            this.priceForm.controls['endPricePeriod'].reset();
            this.priceForm.controls['valuePricePeriod'].reset();            
        }
        //TODO: add toast notification
    }

    removePrice(price) {
        let i = this.property.pricing.findIndex(p => p === price);
        this.property.pricing.splice(i, 1);
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
        this.property.geoLocation = location;                
        this.locationForm.controls['longitude'].setValue(this.property.geoLocation.longitude);        
        this.locationForm.controls['latitude'].setValue(this.property.geoLocation.latitude);
    }
    
    /*
        addAddress() {
            console.log("Saving address ", this.geocodedCity);
            MeteorObservable.call('addAddress', this.geocodedCity).subscribe({
                next: (addressId: string) => {
                    this.property.addressId = addressId;
                },
                error: (e: Error) => {
                    console.log(e);
                }
            });
        }
    */

    updateProperty() {
        //TODO: Skontat bolje spremanje adrese. problem kako je mapirat na property....                        
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
        this.updateProperty();

        this.router.navigate(['/properties']);
    }

    //---------------------------------PRIVATE FUNCTIONS--------------------------------
    private checkIfDateIsValid(start, end): Boolean {
        let valid = true;
        for (let i = 0; i < this.property.pricing.length; i++) {
            const price = this.property.pricing[i];
            if ((start >= price.start && start <= price.end) || (end >= price.start && end <= price.end)) {
                valid = false;
                return;
            }
        }
        return valid;
    }

    private setPropertyObject(): void {
        //set 1 wizard step
        this.property.propertyTypeId = this.locationForm.value.propertyType;
        //geoLocation is mapped on location change
        
        //set 2 wizard step
        this.property.name = [{ text: this.detailForm.value.propertyName, language: 'en' }];
        this.property.headline = [{ text: this.detailForm.value.propertyHeadline, language: 'en' }];
        this.property.summary = [{ text: this.detailForm.value.propertySummary, language: 'en' }];
        this.property.description = [{ text: this.detailForm.value.propertyDescription, language: 'en' }];
        this.property.bedroomDescription = [{ text: this.detailForm.value.bedroomDescription, language: 'en' }];
        this.property.bathroomDescription = [{ text: this.detailForm.value.bathroomDescription, language: 'en' }];
        this.property.propertySize = this.detailForm.value.propertySize;
        this.property.maxGuest = this.detailForm.value.maxGuest;        

        //set 3 wizard step
        this.property.basePrice = this.priceForm.value.basePrice;

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
        console.log(this.property);
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

    private getPropertyTypes() {
        MeteorObservable.subscribe('property-types').takeUntil(componentDestroyed(this)).subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.propertyTypes = this.findPropertyTypes();
            });
        });
    }

    private findPropertyTypes(): IPropertyType[] {
        return PropertyTypes.find().fetch();
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