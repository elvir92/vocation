import {Component, OnInit} from '@angular/core';
import {ILengthUnit, IText} from '../../../../../../imports/models';
import {LengthUnits} from "../../../../../../imports/collections";
import {Observable} from 'rxjs/Observable';
import {MeteorObservable} from 'meteor-rxjs';
import 'rxjs/add/operator/combineLatest';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {NgbModal, NgbModalOptions, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ToasterService} from "angular2-toaster";

@Component({
    //selector: 'app-dashboard',
    templateUrl: './length-unit.component.html',
    //styleUrls: ['./home.component.scss']

})

export class LengthUnitComponent implements OnInit {
    list: Observable<ILengthUnit[]>;

    addNewForm: FormGroup;
    detailsForm: FormGroup;

    newForm: boolean;
    currentLengthUnit: ILengthUnit;
    modalHeaderText: string;
    private modalRef: NgbModalRef;
    private toasterService: ToasterService;


    constructor(private formBuilder: FormBuilder,
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
        this.getLengthUnits();
    }

    openNew(content) {
        this.addNew(true);
        this.modalHeaderText = "Add new length unit";

        //console.log("open called..");
        let ngbModalOptions: NgbModalOptions = {
            backdrop: 'static',
            keyboard: false
        };

        this.modalRef = this.modalService.open(content, ngbModalOptions);
    }

    closeNew() {
        //console.log("close new")
        this.addNew(false);
        this.modalHeaderText = "";

        this.modalRef.close();
        this.modalRef.dismiss();
    }

    openEdit(content, currentLength: ILengthUnit) {
        this.newForm = false;
        this.editCurrent(currentLength);
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
        this.editCurrent(null);
        this.modalHeaderText = "";
        this.modalRef.close();
        this.modalRef.dismiss();
    }

    addNew(value: boolean): void {
        this.newForm = value;
        if (value) {
            // $("#titleNew").focus();
            this.editCurrent(null);
        }
    }

    editCurrent(currentItem: ILengthUnit): void {
        //console.log(currentItem);
        this.currentLengthUnit = currentItem;
        let currTitle = '';

        if (currentItem) {
            currTitle = currentItem.title[0].text;
            // $("#titleItem").focus();
            this.addNew(false);
        }

        this.detailsForm.setValue({
            title: currTitle,
        });
    }

    saveLengthUnit(): void {
        if (this.detailsForm.valid) {
            this.currentLengthUnit.title[0].text = this.detailsForm.value.title;

            MeteorObservable.call('updateLengthUnit', this.currentLengthUnit).subscribe({
                next: () => {
                    this.editCurrent(null);
                    this.detailsForm.reset();

                },
                error: (e: Error) => {
                    console.log(e);
                    this.toasterService.pop('error', '', e.message);
                }
            });
        }
    }

    saveNewLengthUnit() {
        if (this.addNewForm.valid) {
            let texts: IText[] = [];
            let value: IText = {
                text: this.addNewForm.value.title,
                language: 'en'
            };
            texts.push(value);

            let item: ILengthUnit = {
                isActive: true,
                title: texts,
            };

            MeteorObservable.call('addLengthUnit', item).subscribe({
                next: () => {
                    this.newForm = false;
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

    delete(lengthUnit: ILengthUnit): void {
        if (lengthUnit) {
            MeteorObservable.call('removeLengthUnit', lengthUnit).subscribe({
                next: () => {
                    this.getLengthUnits();
                },
                error: (e: Error) => {
                    console.log(e);
                    this.toasterService.pop('error', '', e.message);
                }
            });
        }
    }

    getLengthUnits() {
        MeteorObservable.subscribe('length-units').subscribe(() => {
            MeteorObservable.autorun().subscribe(() => {
                this.list = this.findLengthUnits();
            });
        });
    }

    findLengthUnits(): Observable<ILengthUnit[]> {
        return LengthUnits.find();
    }

}