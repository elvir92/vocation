import {Component, ViewEncapsulation} from '@angular/core';


@Component({
    selector: 'app-layout',
    template: '<router-outlet></router-outlet>',
    styleUrls: ['./auth-layout.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class AuthLayoutComponent {
}
