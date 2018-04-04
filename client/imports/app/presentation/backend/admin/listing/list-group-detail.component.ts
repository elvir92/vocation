import {Component, OnDestroy, OnInit} from '@angular/core';
import {IListGroup, IListing, IList, IText} from '../../../../../../../imports/models';
import {ListsGroups, Lists} from "../../../../../../../imports/collections";
import {MeteorObservable} from 'meteor-rxjs';
import {ActivatedRoute, Router, Params} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import 'rxjs/add/operator/combineLatest';
import {NgbModal, NgbModalOptions, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ToasterService} from "angular2-toaster";
import {componentDestroyed} from "ng2-rx-componentdestroyed";

@Component({
    //selector: 'app-dashboard',
    templateUrl: './list-group-detail.component.html',
    //styleUrls: ['./home.component.scss']
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
    private modalRef: NgbModalRef;
    private toasterService: ToasterService;


    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private formBuilder: FormBuilder,
                toasterService: ToasterService,
                private modalService: NgbModal) {
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

    openNew(content) {
        this.addNewListForm(true);
        this.modalHeaderText = "New Sub-Group";

        //console.log("open called..");
        let ngbModalOptions: NgbModalOptions = {
            backdrop: 'static',
            keyboard: false
        };

        this.modalRef = this.modalService.open(content, ngbModalOptions);
    }

    closeNew() {
        //console.log("close new")
        this.addNewListForm(false);
        this.modalHeaderText = "";

        this.modalRef.close();
        this.modalRef.dismiss();
    }

    openEdit(content, currentItem: IList) {
        this.newListForm = false;
        this.setCurrentListItem(currentItem);
        this.modalHeaderText = "Edit length unit";


        //console.log("open called..");
        let ngbModalOptions: NgbModalOptions = {
            backdrop: 'static',
            keyboard: false
        };


        this.modalRef = this.modalService.open(content, ngbModalOptions);
        /*
        this.modalRef = this.modalService.open(content, ngbModalOptions).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        */
    }

    closeEdit() {
        //console.log("close edit")
        this.setCurrentListItem(null);
        this.modalHeaderText = "";
        this.modalRef.close();
        this.modalRef.dismiss();
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

    saveItemGroup(): void {
        if (this.detailsItemForm.valid) {
            this.currentListItem.title[0].text = this.detailsItemForm.value.title;

            MeteorObservable.call('updateListItem', this.currentListItem).subscribe({
                next: () => {
                    this.setCurrentListItem(null);
                    this.detailsItemForm.reset();
                    this.closeEdit();
                },
                error: (e: Error) => {
                    console.log(e);
                    this.toasterService.pop('error', '', e.message);
                }
            });
        }
    }

    addNewListForm(value: boolean): void {
        this.newListForm = value;
        if (value) {
            //$("#titleNewItem").focus();
            this.setCurrentListItem(null);
        }
    }

    saveNewListItem() {
        if (this.addNewForm.valid) {
            let texts: IText[] = [];
            let value: IText = {
                text: this.addNewForm.value.title,
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
                    this.newListForm = false;
                    this.addNewForm.reset();
                    this.closeNew();
                },
                error: (e: Error) => {
                    console.log(e);
                    this.toasterService.pop('error', '', e.message);
                }
            });
        }
    }

    setCurrentListItem(currentItem: IList): void {
        //console.log(currentItem);
        this.currentListItem = currentItem;
        let currTitle = '';

        if (currentItem) {
            currTitle = currentItem.title[0].text;
            //$("#titleItem").focus();
            this.addNewListForm(false);
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