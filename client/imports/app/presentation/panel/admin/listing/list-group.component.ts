import {Component, OnDestroy, OnInit} from '@angular/core';
import {IListGroup, IListing} from '../../../../../../../imports/models';
import {ListsGroups, Lists} from "../../../../../../../imports/collections";
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {MeteorObservable} from 'meteor-rxjs';
import {PaginationInstance, PaginationService} from "ng2-pagination";
import 'rxjs/add/operator/combineLatest';
import {IMongoOptions} from "../../../../../../../imports/models/index";
import {Router} from "@angular/router";
import {ToasterService} from "angular2-toaster";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {componentDestroyed} from "ng2-rx-componentdestroyed";
import { ListGroupAddNewDialog } from './list-group-add-new-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { filter } from 'rxjs/operators';

@Component({
    //selector: 'app-dashboard',
    templateUrl: './list-group.component.html',
    styleUrls: ['./list-group.component.scss']
})

export class ListGroupComponent implements OnInit, OnDestroy {
    listGroups: Observable<IListing[]>;
    pageSize: Subject<number> = new Subject<number>();
    curPage: Subject<number> = new Subject<number>();
    listGroupsSize: number = 0;
    newForm: FormGroup;


    optionsSub: Subscription;
    dialogRef: MatDialogRef<ListGroupAddNewDialog>;    
    private toasterService: ToasterService;


    constructor(private paginationService: PaginationService,
                private router: Router,
                private formBuilder: FormBuilder,
                toasterService: ToasterService,
                public dialog: MatDialog) {
        //console.log("properties const");
        this.toasterService = toasterService;
    }

    ngOnInit() {
        this.newForm = this.formBuilder.group({
            title: ['', Validators.required],
        });

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

            /*
            MeteorObservable.subscribe('lists-groups', 10, 10).subscribe(() => {
                MeteorObservable.autorun().subscribe(() => {
                    console.log(ListsGroups.find({}).fetch().length);
                });
            });
            */

            MeteorObservable.subscribe('listing', options.limit, options.skip).takeUntil(componentDestroyed(this)).subscribe(() => {
                MeteorObservable.autorun().subscribe(() => {
                    //this.listGroups = this.findListGroups(options);
                    this.listGroups = this.findListing(options);
                });
            });
        });

        const pagInst: PaginationInstance = {
            id: this.paginationService.defaultId(),
            itemsPerPage: 10,
            currentPage: 1,
            totalItems: this.listGroupsSize
        };

        this.paginationService.register(pagInst);
        this.pageSize.next(10);
        this.curPage.next(1);

        // Get total messages count in database so we can have an indication of when to
        // stop the auto-subscriber
        MeteorObservable.call('countMessages').subscribe((count: number) => {
            this.listGroupsSize = count;
            this.paginationService.setTotalItems(this.paginationService.defaultId(), this.listGroupsSize);
        });
    }
    openDialog(): void {
        this.dialogRef = this.dialog.open(ListGroupAddNewDialog, {
 
        });

        this.dialogRef
            .afterClosed()
            .pipe(filter(title => title))
            .subscribe(title => {
                    let newListGroup: IListGroup = {
                        isActive: true,
                        title: [{ language: 'en', text: title }],
                    };

                    MeteorObservable.call('addListGroups', newListGroup).subscribe({
                        next: () => {
                        },
                        error: (e: Error) => {
                            console.log(e);
                            this.toasterService.pop('error', '', e.message);
                        }
                    });
            });
    }

    addNewListGroup(): void {
        if (this.newForm.valid) {
            let newListGroup: IListGroup = {
                isActive: true,
                title: [{language: 'en', text: this.newForm.value.title}],
            };

            MeteorObservable.call('addListGroups', newListGroup).subscribe({
                next: () => {
                    //navigate to anouther page -> listing page
                    //this.router.navigate(['/admin/list-groups']);
                },
                error: (e: Error) => {
                    console.log(e);
                    this.toasterService.pop('error', '', e.message);
                }
            });
            this.newForm.reset();
        }
    }

    findListing(options: IMongoOptions): Observable<IListing[]> {
        // console.log("Get listing JOIN!!")
        //console.log("findListGroups : " + JSON.stringify(ListsGroups.find({}).fetch().length))
        return ListsGroups.find({}, options).map((items: IListGroup[]) => {
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

    deleteListGroup(listGroup: IListGroup): void {
        if (listGroup) {
            MeteorObservable.call('removeListGroups', listGroup).subscribe({
                next: () => {
                    //navigate to anouther page -> listing page
                    //this.router.navigate(['/list-groups']);
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
}