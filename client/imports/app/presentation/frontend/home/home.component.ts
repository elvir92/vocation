import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
    templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {

    closeResult: string;

    constructor(private modalService: NgbModal) {
        console.log("Home-const");
    }

    ngOnInit() {
        console.log("Home-init");
    }

    open(content) {
        console.log("open called..")
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }



}