import {Component, OnInit, OnDestroy} from '@angular/core';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'footer-component',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
    }
}
