import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {HeaderComponent} from "./header/header.component";
'rxjs/add/operator/filter';

@Component({
    selector: 'app-layout',
    templateUrl: './frontend-layout.component.html',
    styleUrls: ['./frontend-layout.component.scss'],
    host: {
        '(window:resize)': 'onResize()'
    }
    //encapsulation: ViewEncapsulation.Native
})
export class FrontendLayoutComponent implements OnInit, OnDestroy {

    headerContainerHeight: Number;

    constructor() {
    }

    ngOnInit(): void {
        this.headerContainerHeight = window.innerHeight;
    }

    onResize() {
        this.headerContainerHeight = window.innerHeight;
    }

    ngOnDestroy() {
        console.log("Front destroy");
    }
}
