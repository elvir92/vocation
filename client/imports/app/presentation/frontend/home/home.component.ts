import {Component, OnDestroy, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';


@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
    host: {
        '(window:resize)': 'onResize()'
    }
})

export class HomeComponent implements OnInit, OnDestroy {
    headerContainerHeight: Number;

    constructor(){

    }

    ngOnInit() {
        this.headerContainerHeight = window.innerHeight;
    }

    onResize() {
        this.headerContainerHeight = window.innerHeight;
    }

    ngOnDestroy() {
    }

}
