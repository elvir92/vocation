import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {IProperty, IPropertyPictures} from "../../../../../../imports/models/property";
import {MeteorObservable} from 'meteor-rxjs';

@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home-temp.component.html'
})

export class HomeComponent implements OnInit, OnDestroy {
    list: Observable<IPropertyPictures[]>;
    email: string;
    loading = false;

    constructor(){

    }

    ngOnInit() {
        console.log('home init');
        /* MeteorObservable.subscribe('properties').takeUntil(componentDestroyed(this)).subscribe(() => {
             MeteorObservable.autorun().subscribe(() => {
                 //this.listGroups = this.findListGroups(options);
                 this.list = this.findProperties();
             });
         });*/
    }

    addEmail() {
        if (this.email) {
            this.loading = true;
            MeteorObservable.call('addEmail', this.email).subscribe({
                next: () => {
                },
                error: (e: Error) => {
                    console.log(e);
                    this.loading = false;
                }
            });

        }
    }

    /*
    findProperties(): Observable<IPropertyPictures[]> {
        return Properties.find({}).map((items: IProperty[]) => {
            let lst: IPropertyPictures[] = [];
            items.forEach((item: IProperty) => {
                let tmp: IPropertyPictures = {
                    property: item,
                    pictures: Pictures.find({ _id: { $in: item.images } }).fetch()
                };
                lst.push(tmp);
            });
            return lst;
        });
    }
    */
    ngOnDestroy() {
    }

}