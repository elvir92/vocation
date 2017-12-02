import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'app-layout',
    templateUrl: './backend-layout.component.html',
    styleUrls: ['./backend-layout.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class BackendLayoutComponent implements OnInit, OnDestroy {

    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {

    }

}
