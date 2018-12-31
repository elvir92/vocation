import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from "@angular/forms";

import { ILocation } from "../../../../../imports/models/geo_location";
import { MapsAPILoader } from "@agm/core";


@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit, AfterViewInit, OnChanges {
    @Output() onChange: EventEmitter<ILocation> = new EventEmitter<ILocation>();

    @Input() location: ILocation ;
    @Input() askForAutoLocation: boolean;
    
    showMarker: boolean = false;

    autocomplete: google.maps.places.Autocomplete;
    geocoder: google.maps.Geocoder;

    searchControl: FormControl;
    zoom = 2;

    @ViewChild("search")
    searchElementRef: ElementRef;

    constructor(private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone, ) {
    }

    ngOnInit() {
        //create search FormControl
        this.searchControl = new FormControl();
    }

    ngAfterViewInit() {
        //set current position
        this.setCurrentPosition();
        this.findAdress();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.location.latitude && this.location.longitude) {
            this.zoom = 14;            
            this.getFullLocation();
        }
    }


    findAdress() {
        //load Google Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            this.geocoder = new google.maps.Geocoder;
            this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ["address"]
            });

            this.autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    this.showMarker = true;
                    //get the place result                    
                    let place: google.maps.places.PlaceResult = this.autocomplete.getPlace();
                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    //set latitude, longitude and zoom
                    this.location.latitude = place.geometry.location.lat();
                    this.location.longitude = place.geometry.location.lng();
                    this.location.formattedAddress = place.formatted_address;
                    this.zoom = 14;
                    this.getFullLocation();
                });
            });
        });
    }

    mapReady() {
        this.getFullLocation();
    }

    markerDragEnd($event) {
        this.location.latitude = $event.coords.lat;
        this.location.longitude = $event.coords.lng;
        this.getFullLocation();
    }

    mapClicked($event) {
        this.location.latitude = $event.coords.lat;
        this.location.longitude = $event.coords.lng;
        this.getFullLocation();
    }

    private getFullLocation() {
        if (!this.location.latitude || !this.location.longitude) return;

        this.showMarker = true;

        let request = { 'location': { lat: this.location.latitude, lng: this.location.longitude } };

        if (this.geocoder)
            this.geocoder.geocode(request, (results, status) => {
                this.location.mapObject = results;

                if (status === google.maps.GeocoderStatus.OK) {
                    let result = results[0];

                    if (result) {
                        this.location.formattedAddress = result.formatted_address;
                        this.searchControl.setValue(this.location.formattedAddress);

                        let country = result.address_components.filter(value => {
                            if (value.types.some(type => type === 'country')) {
                                return value;
                            }
                        });
                        if (country && country.length > 0) {
                            this.location.country = country[0].long_name;
                            this.location.countryShort = country[0].short_name;
                        }

                        let city = result.address_components.filter(value => {
                            if (value.types.some(type => type === 'locality')) {
                                return value;
                            }
                        });
                        if (city && city.length > 0) {
                            this.location.city = city[0].long_name;
                            this.location.cityShort = city[0].short_name;
                        }
                    }
                    this.onChange.emit(this.location);
                }
            });
    }

    private setCurrentPosition() {        
        if (this.askForAutoLocation && "geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                // console.log('current position : ', position.coords);
                this.location.latitude = position.coords.latitude;
                this.location.longitude = position.coords.longitude;
                this.zoom = 14;
                this.getFullLocation();
            });
        }
    }

}
