import {Component, OnDestroy, OnInit} from '@angular/core';
import {IListGroup, IListing, IList, IText} from '../../../../../../../imports/models';
import {ListsGroups, Lists} from "../../../../../../../imports/collections";
import {MeteorObservable} from 'meteor-rxjs';
import {ActivatedRoute, Router, Params} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import 'rxjs/add/operator/combineLatest';
import {ToasterService} from "angular2-toaster";
import {componentDestroyed} from "ng2-rx-componentdestroyed";
import { ListGroupDetailDialog } from './list-group-detail-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { filter } from 'rxjs/operators';

@Component({
    //selector: 'app-dashboard',
    templateUrl: './list-group-detail.component.html',
    styleUrls: ['./list-group.component.scss']
})

export class ListGroupDetailComponent implements OnInit, OnDestroy {
    listing: IListing;
    listGroupId: string;
    addNewForm: FormGroup;
    detailsForm: FormGroup;
    detailsItemForm: FormGroup;
    currentListItem: IList;
    newListForm: boolean;

    modalHeaderText: string;
    dialogRef: MatDialogRef<ListGroupDetailDialog>;
    
    private toasterService: ToasterService;


    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder,
                toasterService: ToasterService,
                public dialog: MatDialog) {
        //console.log("properties const");
        this.toasterService = toasterService;
    }

    ngOnInit() {
        this.detailsForm = this.formBuilder.group({
            title: ['', Validators.required],
        });
        this.addNewForm = this.formBuilder.group({
            title: ['', Validators.required],
        });
        this.detailsItemForm = this.formBuilder.group({
            title: ['', Validators.required],
        });

        this.activatedRoute.params.subscribe((params: Params) => {
            this.listGroupId = params['id'];
            this.getListingByGroup();
        });
    }

    ngOnDestroy(): void {
    }

    openDialog(item?): void {
        this.dialogRef = this.dialog.open(ListGroupDetailDialog, {
            data: {
                title: item ? item.title[0].text : ''
            }
        });

        this.dialogRef
            .afterClosed()
            .pipe(filter(title => title))
            .subscribe(title => {
                if (item) {
                    item.title[0].text = title;

                    MeteorObservable.call('updateListItem', item).subscribe({
                        next: () => {
                        },
                        error: (e: Error) => {
                            console.log(e);
                            this.toasterService.pop('error', '', e.message);
                        }
                    });
                } else {
                    let texts: IText[] = [];
                    let value: IText = {
                        text: title,
                        language: 'en'
                    };
                    texts.push(value);

                    let item: IList = {
                        isActive: true,
                        parentId: this.listGroupId,
                        title: texts
                    };

                    MeteorObservable.call('addListItem', item).subscribe({
                        next: () => {
                        },
                        error: (e: Error) => {
                            console.log(e);
                            this.toasterService.pop('error', '', e.message);
                        }
                    });
                }

            });
    }


    saveListGroup(): void {
        if (this.detailsForm.valid) {
            this.listing.listGroup.title[0].text = this.detailsForm.value.title;

            MeteorObservable.call('updateListGroups', this.listing.listGroup).subscribe({
                next: () => {
                    //navigate to anouther page -> listing page
                    this.router.navigate(['/admin/list-groups']);
                },
                error: (e: Error) => {
                    console.log(e);
                    this.toasterService.pop('error', '', e.message);
                }
            });
            this.detailsForm.reset();
        }
    }

    setCurrentListItem(currentItem: IList): void {
        //console.log(currentItem);
        this.currentListItem = currentItem;
        let currTitle = '';

        if (currentItem) {
            currTitle = currentItem.title[0].text;
            //$("#titleItem").focus();
        }

        this.detailsItemForm.setValue({
            title: currTitle,
        });
    }

    deleteList(list: IList): void {
        console.log("delete list")
        if (list) {
            MeteorObservable.call('removeListItem', list).subscribe({
                next: () => {
                    //navigate to anouther page -> listing page
                    //this.router.navigate(['/list-groups', this.listGroupId]);
                    //Success toaster notification. . .
                },
                error: (e: Error) => {
                    console.log(e);
                    this.toasterService.pop('error', '', e.message);
                }
            });
        }
    }

    findOneListing(id): IListing {
        //console.log(JSON.stringify(ListsGroups.find({}).fetch()));
        let mainGroup: IListGroup = ListsGroups.findOne({_id: id});
        // console.log(JSON.stringify(mainGroup));

        let lst: IList[] = Lists.find({parentId: id}).fetch();
        let response: IListing = {
            listGroup: mainGroup,
            lists: lst
        };
        this.detailsForm.setValue({
            title: mainGroup.title[0].text,
        });
        //this.detailsForm.value.title = mainGroup.title[0].text;
        //return Observable.of(response);
        return response;
    }

    getListingByGroup() {
        MeteorObservable.subscribe('listing-by-group', this.listGroupId).takeUntil(componentDestroyed(this)).subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.listing = this.findOneListing(this.listGroupId);
            });
        });
    }
}