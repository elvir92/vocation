import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MeteorObservable} from 'meteor-rxjs';
import {Observable} from 'rxjs';

import {
    IPropertyPlace,
    IListing,
    IListGroup,
    IProperty,
    IList,
    IPlace,
    ILengthUnit,
    ILocation,
    IPicture
} from '../../../../../../imports/models';
import {Pictures, ListsGroups, Lists, Places, LengthUnits} from "../../../../../../imports/collections";
import {} from 'googlemaps';

import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
    //selector: 'app-',
    templateUrl: './property-edit.component.html',
    //styleUrls: ['./property-new.component.scss']template
})

export class PropertyEditComponent implements OnInit {
    listing: Observable<IListing[]>;
    pictures: Observable<IPicture[]>;
    private propertyId: string;
    places: IPlace[];
    lengthUnits: ILengthUnit[];
    propertyForm: FormGroup;
    property: IProperty;
    private loadedPlaces = false;


    constructor(private _fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,) {
        //console.log("properties const");
    }

    ngOnInit() {
        this.propertyForm = this._fb.group({
            propertyName: ['', [Validators.required, Validators.minLength(5)]],
            propertyHeadline: ['', [Validators.required, Validators.minLength(5)]],
            propertySummary: ['', [Validators.required, Validators.minLength(5)]],
            propertyDescription: ['', [Validators.required, Validators.minLength(5)]],
            places: this._fb.array([])
        });
        //init places

        this.activatedRoute.params.subscribe((params: Params) => {
            this.propertyId = params['id'];
            this.getPropertyDetail();
        });

        this.getListing();
        this.getLengthUnits();
        this.getPlaces();
        this.getPictures();
    }

    deletePicture(image: IPicture) {
        MeteorObservable.call("removePicture", image).subscribe({
            next: () => {
                console.log("removed picture . image should disappear automatically")
            },
            error: (e: Error) => {
                console.log(e);
            }
        });
    }

    onImage(imageId: string) {
        //console.log("onImage called : imageId " + imageId);
        this.property.images.push(imageId);
        this.findPictures();
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
    }

    addOrSaveProperty() {

        this.setPropertyObject();
        MeteorObservable.call('updateProperty', this.property).subscribe({
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
    private initPlaceForm(placeId: string) {
        const propPlace = this.property.places.find(obj => obj.placeId == placeId);

        const frmGrp = {
            placeId: placeId,
            title: [propPlace ? propPlace.title[0].text : '', Validators.required],
            distanceValue: [propPlace ? propPlace.distanceValue : '', Validators.required],
            distanceType: propPlace ? propPlace.distanceType._id : this.lengthUnits[0]._id,
        };
        return this._fb.group(frmGrp);
    }

    private initPropertyFormGroup() {
        if (this.property && this.loadedPlaces) {
            this.propertyForm.patchValue({
                propertyName: this.property.name[0].text,
                propertyHeadline: this.property.headline[0].text,
                propertySummary: this.property.summary[0].text,
                propertyDescription: this.property.description[0].text,
            });

            this.places.forEach((place: IPlace) => {
                // add place to the list
                const control = <FormArray>this.propertyForm.controls['places'];
                control.push(this.initPlaceForm(place._id));
            });
        }
    }

    private getPropertyDetail() {
        MeteorObservable.call('getPropertyById', this.propertyId).subscribe({
            next: (property: IProperty) => {
                this.property = property;
                this.initPropertyFormGroup();
            },
            error: (e: Error) => {
                console.log(e);
            }
        });
    }

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

    private getPictures() {
        MeteorObservable.subscribe('pictures').subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.findPictures();
            });
        });
    }

    private findPictures() {
        this.pictures = Pictures.find({_id: {$in: this.property.images}});
    }

    private getListing() {
        MeteorObservable.subscribe('listing').subscribe(() => {
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
        MeteorObservable.subscribe('places').subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.places = this.findPlaces();
                this.loadedPlaces = true;
                this.initPropertyFormGroup();
            });
        });
    }

    private findPlaces(): IPlace[] {
        return Places.find().fetch();
    }

    private getLengthUnits() {
        MeteorObservable.subscribe('length-units').subscribe(() => {
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