import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-layout',
    template: '<router-outlet></router-outlet>',
    styleUrls: ['./auth-layout.component.scss'],
    // encapsulation: ViewEncapsulation.None

})
export class AuthLayoutComponent implements OnInit, OnDestroy {

    constructor() {
    }

    ngOnInit(): void {
        console.log("Auth init")
    }

    ngOnDestroy() {
        console.log("Auth destroy");
    }
}
