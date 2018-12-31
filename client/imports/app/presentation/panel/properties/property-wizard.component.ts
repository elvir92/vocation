import { Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
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
    selector: 'app-property-wizard',
    templateUrl: './property-wizard.component.html',
    styleUrls: ['./property-wizard.component.scss']
})

export class PropertyWizardComponent implements OnInit, OnDestroy {
    @Output() onSave: EventEmitter<IProperty> = new EventEmitter<IProperty>();
    @Input() id: string;

    private loadedPlaces = false;
    private loadedActivities = false;

    isLinear = true;
    askForAutoLocation = true;

    listing: Observable<IListing[]>;
    pictures: Observable<IPicture[]>;
    places: IPlace[];
    lengthUnits: ILengthUnit[];
    propertyTypes: IPropertyType[];



    //main object to save    
    property: IProperty = {
        propertySize: 0,
        maxGuest: 0,
        geoLocation: {
            longitude: null,
            latitude: null,
            formattedAddress: null,
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

    //forms for validating wizard    
    locationForm: FormGroup;
    detailForm: FormGroup;
    priceForm: FormGroup;

    propertyForm: FormGroup;

    constructor(private _fb: FormBuilder, private router: Router, private mapsAPILoader: MapsAPILoader) {
        // console.log(this.property.geoLocation);
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
            activities : this._fb.array([]),
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
        });

        this.getPropertyDetail();
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

    onChangeActivity(event) {       
        const activities = <FormArray>this.propertyForm.get('activities') as FormArray;

        if (event.checked) {
            activities.push(new FormControl(event.source.value))
        } else {
            const i = activities.controls.findIndex(x => x.value === event.source.value);
            activities.removeAt(i);
        }        
    }

    onChangeLocation(location: ILocation) {
        this.property.geoLocation = location;
        this.locationForm.controls['longitude'].setValue(this.property.geoLocation.longitude);
        this.locationForm.controls['latitude'].setValue(this.property.geoLocation.latitude);
    }

    isActivityChecked(item : IList) {
        return this.property.activities ? this.property.activities.some(x => x == item._id) : false;
    }
    
    updateProperty() {
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

    

    private getPropertyDetail() {
        if (this.id) {
            MeteorObservable.call('getPropertyById', this.id).subscribe({
                next: (property: IProperty) => {
                    this.property = property;
                    //set values . . . .
                    this.updatePropertyForm();
                },
                error: (e: Error) => {
                    console.log(e);
                }
            });
        }
    }

    private updatePropertyForm() {
        if (this.property && this.property._id) {

            // 1. Location part 
            this.locationForm.controls['propertyType'].setValue(this.property.propertyTypeId);
            this.locationForm.controls['longitude'].setValue(this.property.geoLocation.longitude);
            this.locationForm.controls['latitude'].setValue(this.property.geoLocation.latitude);

            // 2. Details part            
            this.detailForm.patchValue({
                propertyName: this.getTranslationText(this.property.name),
                propertyHeadline: this.getTranslationText(this.property.headline),
                propertySummary: this.getTranslationText(this.property.summary),
                propertyDescription: this.getTranslationText(this.property.description),
                bedroomDescription: this.getTranslationText(this.property.bedroomDescription),
                bathroomDescription: this.getTranslationText(this.property.bathroomDescription),
                propertySize: this.property.propertySize,
                maxGuest: this.property.maxGuest,
            });

            // 3. Pricing
            this.priceForm.controls['basePrice'].setValue(this.property.basePrice);

            // 4. Places
            this.fillPlacePropertyFormGroup();
            
            // 5. Activities
            if(this.loadedActivities && this.property.activities && this.property.activities.length > 0){
                const activities = <FormArray>this.propertyForm.get('activities') as FormArray;
                this.property.activities.forEach(a => activities.push(new FormControl(a)))                               
            }
            this.findPictures();
        }
    }

    private fillPlacePropertyFormGroup() {
        if(this.loadedPlaces){
            const placeForm = <FormArray>this.propertyForm.get('places') as FormArray;
                for (let i = 0; i < placeForm.controls.length; i++) {
                    let element =<FormGroup>placeForm.controls[i];
                                    
                    let savedPlace = this.property.places.find(x=>x.placeId === element.value.placeId);
                    
                    if (savedPlace) {                        
                        element.controls['title'].setValue(this.getTranslationText(savedPlace.title));
                        element.controls['distanceValue'].setValue(savedPlace.distanceValue);
                        if (savedPlace.distanceType) element.controls['distanceType'].setValue(savedPlace.distanceType._id);
                     }
                }
            }
    }


    private setPropertyObject(): void {
        // 1. Location
        this.property.propertyTypeId = this.locationForm.value.propertyType;
        //geoLocation is mapped on location change

        // 2. Detail
        this.property.name = [{ text: this.detailForm.value.propertyName, language: 'en' }];
        this.property.headline = [{ text: this.detailForm.value.propertyHeadline, language: 'en' }];
        this.property.summary = [{ text: this.detailForm.value.propertySummary, language: 'en' }];
        this.property.description = [{ text: this.detailForm.value.propertyDescription, language: 'en' }];
        this.property.bedroomDescription = [{ text: this.detailForm.value.bedroomDescription, language: 'en' }];
        this.property.bathroomDescription = [{ text: this.detailForm.value.bathroomDescription, language: 'en' }];
        this.property.propertySize = this.detailForm.value.propertySize;
        this.property.maxGuest = this.detailForm.value.maxGuest;

        // 3. Price
        this.property.basePrice = this.priceForm.value.basePrice;

        // 4. Places
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
        
        // 5. Activities
        this.property.activities = this.propertyForm.value.activities;
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
                this.loadedActivities = true;
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
                this.loadedPlaces = true;

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

    private getTranslationText(prop) {
        return prop ? prop.length > 0 ? prop[0].text : '' : '';
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