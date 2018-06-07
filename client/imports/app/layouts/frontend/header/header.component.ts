import {Component, OnInit, OnDestroy} from '@angular/core';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'header-component',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
    }
}
