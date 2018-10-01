import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-sidemenu-item',
    templateUrl: './sidemenu-item.component.html',
    styleUrls: ['./sidemenu-item.component.scss']
})
export class SidemenuItemComponent implements OnInit {

    @Input() menu;
    @Input() iconOnly: boolean;
    @Input() secondaryMenu: boolean = false;

    constructor() {
    }

    ngOnInit() {

    }

    openLink() {
        this.menu.open = this.menu.open
    }

    check(): boolean {
        if (this.menu.admin == true) {
            const currentUser = Meteor.user();
            if ("profile" in currentUser && "type" in currentUser.profile && currentUser.profile.type === 0) {
                return true;
            }
            return false;
        }
        return true;
    }

    getHeight() {

        if (this.menu.open == false) return '48px';
        else {
            if (this.menu && this.menu.sub) {
                let height = (this.menu.sub.length * 56) + 56 + "px";
                return height;
            }
        }
    }

    chechForChildMenu() {
        return (this.menu && this.menu.sub) ? true : false;
    }

}
