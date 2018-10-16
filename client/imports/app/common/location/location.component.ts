import {Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef, NgZone} from '@angular/core';
import {FormControl} from "@angular/forms";

import {ILocation} from "../../../../../imports/models/geo_location";
import {MapsAPILoader} from "@agm/core";


@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
    @Output() onChange: EventEmitter<ILocation> = new EventEmitter<ILocation>();

    location: ILocation = {
        longitude: 39.8282,
        latitude: -98.5795,
        formattedAddress: null,
        mapObject: null
    };

    searchControl: FormControl;
    zoom: number = 4;

    @ViewChild("search")
    searchElementRef: ElementRef;

    constructor(private mapsAPILoader: MapsAPILoader,
                private ngZone: NgZone,) {
    }

    ngOnInit() {
        //set google maps defaults
        //create search FormControl
        this.searchControl = new FormControl();

        //set current position
        this.setCurrentPosition();
        //load Google Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    //let place: google.maps.places.PlaceResult = autocomplete.getPlace();
                    let place = autocomplete.getPlace();

                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    //set latitude, longitude and zoom
                    this.location.latitude = place.geometry.location.lat();
                    this.location.longitude = place.geometry.location.lng();
                    this.zoom = 14;
                    this.emitChanges();
                });
            });
        });
    }

    markerDragEnd($event) {
        console.log('dragEnd', $event);
        this.location.latitude = $event.coords.lat;
        this.location.longitude = $event.coords.lng;
        this.emitChanges();
    }

    mapClicked($event) {
        console.log('dragEnd', $event);
        this.location.latitude = $event.coords.lat;
        this.location.longitude = $event.coords.lng;
        this.emitChanges();
    }

    private emitChanges() {
        this.onChange.emit(this.location);
    }

    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.location.latitude = position.coords.latitude;
                this.location.longitude = position.coords.longitude;
                this.zoom = 14;
                this.emitChanges();
            });
        }
    }

}
 