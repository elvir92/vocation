import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
'rxjs/add/operator/filter';

@Component({
    selector: 'app-layout',
    templateUrl: './frontend-layout-temp.component.html',
    styleUrls: ['./frontend-layout.component.scss'],
    //encapsulation: ViewEncapsulation.Native
})
export class FrontendTempLayoutComponent implements OnInit, OnDestroy {
    constructor() {
    }

    ngOnInit(): void {
        console.log("Front init")
    }

    ngOnDestroy() {
        console.log("Front destroy");
    }
}
