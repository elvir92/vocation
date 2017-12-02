import {Component, OnInit, OnDestroy} from '@angular/core';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'app-layout',
    templateUrl: './frontend-layout.component.html',
    styleUrls: ['./frontend-layout.component.scss']
})
export class FrontendLayoutComponent implements OnInit, OnDestroy {
    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
    }
}
