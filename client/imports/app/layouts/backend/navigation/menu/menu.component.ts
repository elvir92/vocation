import {Component} from '@angular/core';
import 'rxjs/add/operator/map';
import {Router} from "@angular/router";


@Component({
    selector: 'app-backend-menu',
    templateUrl: './menu.component.html',
    //styleUrls: ['./home.component.scss']
})

export class MenuBackendComponent {
    constructor(private router: Router) {
    }

    checkIfIsAdmin(): boolean {
        const currentUser = Meteor.user();
        if ("profile" in currentUser && "type" in currentUser.profile && currentUser.profile.type === 0) {
            return true;
        }
        return false;
    }

    logout() {
        Meteor.logout();
        this.router.navigate(['']);
    }
}