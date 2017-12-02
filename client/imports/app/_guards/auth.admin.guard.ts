import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';

@Injectable()
export class AuthAdminGuard implements CanActivate {

    constructor(private router: Router) {
        console.log("Auth Admin Guard..");
    }

    canActivate() {
        const currentUser = Meteor.user();

        if ("profile" in currentUser && "type" in currentUser.profile && currentUser.profile.type === 0) {
            return true;
        }
        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}