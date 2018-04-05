import {Component, OnDestroy, OnInit} from '@angular/core';
import {IPlace} from '../../../../../../../imports/models';
import {Places} from "../../../../../../../imports/collections";
import {Observable} from 'rxjs/Observable';
import {MeteorObservable} from 'meteor-rxjs';
import 'rxjs/add/operator/combineLatest';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {NgbModal, NgbModalOptions, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ToasterService} from "angular2-toaster";
import {componentDestroyed} from "ng2-rx-componentdestroyed";

@Component({
    //selector: 'app-dashboard',
    templateUrl: './places.component.html',
    //styleUrls: ['./home.component.scss']
})

export class PlacesComponent implements OnInit, OnDestroy {
    list: Observable<IPlace[]>;
    private modalRef: NgbModalRef;

    addNewForm: FormGroup;
    detailsForm: FormGroup;

    newForm: boolean;
    currentPlace: IPlace;
    modalHeaderText: string;

    private toasterService: ToasterService;

    constructor(private _fb: FormBuilder,
                toasterService: ToasterService,
                private modalService: NgbModal) {
        //console.log("places component");
        this.toasterService = toasterService;
    }

    ngOnDestroy(): void {
    }


    openNew(content) {
        this.addNew(true);
        this.modalHeaderText = "New Place";

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

    closeNew() {
        //console.log("close new")
        this.addNew(false);
        this.modalHeaderText = "";

        this.modalRef.close();
        this.modalRef.dismiss();
    }

    openEdit(content, currentPlace: IPlace) {
        this.newForm = false;
        this.editCurrent(currentPlace);
        this.modalHeaderText = "Edit Place";


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
        this.editCurrent(null);
        this.modalHeaderText = "";
        this.modalRef.close();
        this.modalRef.dismiss();
    }

    /*
    private getDismissReason(reason: any): string {

        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
    */
    ngOnInit() {
        this.detailsForm = this._fb.group({
            title: ['', Validators.required],
            placeholder: ['', Validators.required],
        });
        this.addNewForm = this._fb.group({
            title: ['', Validators.required],
            placeholder: ['', Validators.required],
        });
        this.getPlaces();
    }

    addNew(value: boolean): void {
        this.newForm = value;

        if (value) {
            //$("#titleNew").focus();
            this.editCurrent(null);
        }
    }

    editCurrent(currentItem: IPlace): void {
        //console.log(currentItem);
        this.currentPlace = currentItem;
        let currTitle = '';
        let currPlaceholder = '';

        if (currentItem) {
            currTitle = currentItem.title[0].text;
            currPlaceholder = currentItem.placeholder[0].text;
            //$("#titleItem").focus();
            this.addNew(false);
        }

        this.detailsForm.setValue({
            title: currTitle,
            placeholder: currPlaceholder,
        });
    }

    savePlace(): void {
        if (this.detailsForm.valid) {
            this.currentPlace.title[0].text = this.detailsForm.value.title;
            this.currentPlace.placeholder[0].text = this.detailsForm.value.placeholder;

            MeteorObservable.call('updatePlace', this.currentPlace).subscribe({
                next: () => {
                    this.editCurrent(null);
                    //this.toasterService.pop('success', 'Args Title', 'Args Body');
                    this.detailsForm.reset();
                },
                error: (e: Error) => {
                    console.log(e);
                    this.toasterService.pop('error', '', e.message);
                }
            });
            this.closeEdit();
        }
    }

    saveNewPlace() {
        if (this.addNewForm.valid) {
            let place: IPlace = {
                isActive: true,
                title: [{language: 'en', text: this.addNewForm.value.title}],
                placeholder: [{language: 'en', text: this.addNewForm.value.placeholder}],
            };

            MeteorObservable.call('addLPlace', place).subscribe({
                next: () => {
                    //this.toasterService.pop('success', 'Args Title', "");
                    this.newForm = false;
                    this.addNewForm.reset();
                    this.closeNew();
                },
                error: (e: Error) => {
                    console.log(e);
                    this.toasterService.pop({
                        type: 'error',
                        body: e.message,
                        showCloseButton: true
                    });
                }
            });
        }
    }

    delete(place: IPlace): void {
        if (place) {
            MeteorObservable.call('removePlace', place).subscribe({
                next: () => {
                    //this.getPlaces();
                },
                error: (e: Error) => {
                    console.log(e);
                    this.toasterService.pop({
                        type: 'error',
                        body: e.message,
                        showCloseButton: true
                    });
                }
            });
        }
    }

    getPlaces() {
        //console.log("getPlaces");
        MeteorObservable.subscribe('places').takeUntil(componentDestroyed(this)).subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.list = this.findPlaces();
            });
        });
    }

    findPlaces(): Observable<IPlace[]> {
        return Places.find();
    }
}