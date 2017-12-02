import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {Router} from "@angular/router";

@Component({
    selector: 'app-backend-header',
    templateUrl: './header.component.html',
    //styleUrls: ['./home.component.scss']
})
export class HeaderBackendComponent {
    constructor(private router: Router) {
    }

    logout() {
        Meteor.logout();
        this.router.navigate(['/login']);
    }
}