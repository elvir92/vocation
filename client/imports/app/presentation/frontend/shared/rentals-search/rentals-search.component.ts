import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Component({
    selector: 'rentals-search',
    styleUrls: ['./rentals-search.component.scss'],
    templateUrl: './rentals-search.component.html'
})

export class RentalsSearchComponent implements OnInit {

    constructor(private router:Router){

    }

    ngOnInit() {
    }
}
