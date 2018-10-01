import { Component, OnDestroy, OnInit } from '@angular/core';
import { MeteorObservable } from 'meteor-rxjs';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { IEmail } from 'imports/models';
import { Emails } from 'imports/collections';
import { componentDestroyed } from "ng2-rx-componentdestroyed";


@Component({
    //selector: 'app-',
    templateUrl: './subscribers.component.html',
    styleUrls: ['./subscribers.component.scss']
})

export class SubscribersComponent implements OnInit, OnDestroy {
    list: Observable<IEmail[]>;

    constructor() {
        console.log('subscribers')
    }

    ngOnInit() {
        this.getSubscribers();
    }

    ngOnDestroy(): void {
    }

    getSubscribers() {
        MeteorObservable.subscribe('emails').takeUntil(componentDestroyed(this)).subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.list = this.findSubsribers();
            });
        });
    }

    findSubsribers(): Observable<IEmail[]> {
        return Emails.find();
    }
}
