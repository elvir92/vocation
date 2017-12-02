import {Component, OnInit} from '@angular/core';

// import template from './home.component.html';

@Component({
    //selector: 'app-dashboard',
    templateUrl: './home.component.html',
    //styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

    constructor() {
        console.log("Home-Constructor");
    }

    ngOnInit() {
        console.log("Home-Init");
    }

}