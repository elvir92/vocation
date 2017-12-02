import {Component, OnDestroy, OnInit} from '@angular/core';
import {MeteorObservable} from 'meteor-rxjs';
import {IProperty} from "../../../../../../imports/models";
import {Properties} from "../../../../../../imports/collections";
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';

import {PaginationService, PaginationInstance} from "ng2-pagination";
import {IMongoOptions} from "../../../../../../imports/models/mongo-options";

@Component({
    //selector: 'app-',
    templateUrl: './properties.component.html',
    //styleUrls: ['./property-new.component.scss']template
})

export class PropertiesComponent implements OnInit, OnDestroy {
    list: Observable<IProperty[]>;
    pageSize: Subject<number> = new Subject<number>();
    curPage: Subject<number> = new Subject<number>();
    listPropertySize: number = 0;

    optionsSub: Subscription;

    constructor(private paginationService: PaginationService,) {
    }

    ngOnInit() {
        this.optionsSub = Observable.combineLatest(
            this.pageSize,
            this.curPage
        ).subscribe(([pageSize, curPage]) => {
            //console.log("re call")
            const options: IMongoOptions = {
                limit: pageSize as number,
                skip: ((curPage as number) - 1) * (pageSize as number),
            };

            this.paginationService.setCurrentPage(this.paginationService.defaultId(), curPage as number);

            MeteorObservable.subscribe('properties', options.limit, options.skip).subscribe(() => {
                MeteorObservable.autorun().subscribe(() => {
                    //this.listGroups = this.findListGroups(options);
                    this.list = this.findProperties(options);
                });
            });
        });

        const pagInst: PaginationInstance = {
            id: this.paginationService.defaultId(),
            itemsPerPage: 10,
            currentPage: 1,
            totalItems: this.listPropertySize
        };

        this.paginationService.register(pagInst);
        this.pageSize.next(10);
        this.curPage.next(1);

        // Get total messages count in database so we can have an indication of when to
        // stop the auto-subscriber
        MeteorObservable.call('countProperties').subscribe((count: number) => {
            this.listPropertySize = count;
            this.paginationService.setTotalItems(this.paginationService.defaultId(), this.listPropertySize);
        });
    }


    deleteProperty(property: IProperty): void {
        if (property) {
            MeteorObservable.call('removeProperty', property).subscribe({
                next: () => {
                    this.curPage.next(1);
                },
                error: (e: Error) => {
                    console.log(e);
                }
            });
        }
    }

    ngOnDestroy() {
        this.optionsSub.unsubscribe();
    }

    onPageChanged(page: number): void {
        //console.log(page);
        this.curPage.next(page);
    }

    findProperties(options: IMongoOptions): Observable<IProperty[]> {
        return Properties.find({}, options);
    }
}