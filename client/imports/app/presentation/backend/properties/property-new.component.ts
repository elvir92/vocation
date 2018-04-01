import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MeteorObservable} from 'meteor-rxjs';
import {Observable} from 'rxjs';

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
import {Pictures, ListsGroups, Lists, Places, LengthUnits} from "../../../../../../imports/collections";
import {} from 'googlemaps';

import {Router} from "@angular/router";
import {componentDestroyed} from "ng2-rx-componentdestroyed";

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


    propertyForm: FormGroup;

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

    constructor(private _fb: FormBuilder, private router: Router,) {
        //console.log("properties const");
    }

    ngOnInit() {
        this.getListing();
        this.getLengthUnits();
        this.getPlaces();
        this.getPictures();

        this.propertyForm = this._fb.group({
            propertyName: ['', [Validators.required, Validators.minLength(5)]],
            propertyHeadline: ['', [Validators.required, Validators.minLength(5)]],
            propertySummary: ['', [Validators.required, Validators.minLength(5)]],
            propertyDescription: ['', [Validators.required, Validators.minLength(5)]],
            places: this._fb.array([])
        });
    }

    ngOnDestroy(): void {
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
        console.log(location);
    }

    addOrSaveProperty() {
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

        this.router.navigate(['/backend/properties']);
    }

    //---------------------------------PRIVATE FUNCTIONS--------------------------------
    private setPropertyObject(): void {
        this.property.name = [{text: this.propertyForm.value.propertyName, language: 'en'}];
        this.property.headline = [{text: this.propertyForm.value.propertyHeadline, language: 'en'}];
        this.property.summary = [{text: this.propertyForm.value.propertySummary, language: 'en'}];
        this.property.description = [{text: this.propertyForm.value.propertyDescription, language: 'en'}];

        for (let i in this.propertyForm.value.places) {
            let plVal = this.propertyForm.value.places[i];
            if (plVal.title) {
                const lngthObj = this.lengthUnits.find(obj => obj._id == plVal.distanceType);
                this.property.places.push({
                    title: [{text: plVal.title, language: 'en'}],
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
        this.pictures = Pictures.find({_id: {$in: this.property.images}});
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
        return ListsGroups.find({isActive: true}).map((items: IListGroup[]) => {
            let lst: IListing[] = [];
            items.forEach((item: IListGroup) => {
                let tmp: IListing = {
                    lists: Lists.find({parentId: item._id}).fetch(),
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