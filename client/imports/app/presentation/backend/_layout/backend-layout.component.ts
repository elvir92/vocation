import {Component, OnInit, Input} from '@angular/core';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    query,
} from '@angular/animations'

@Component({
    selector: 'app-layout',
    templateUrl: './backend-layout.component.html',
    styleUrls: ['./backend-layout.component.scss']

})

export class BackendLayoutComponent implements OnInit {
    @Input() isVisible: boolean = true;
    visibility = 'shown';

    sideNavOpened: boolean = true;
    matDrawerOpened: boolean = false;
    matDrawerShow: boolean = true;
    sideNavMode: string = 'side';

    ngOnChanges() {
        this.visibility = this.isVisible ? 'shown' : 'hidden';
    }

    constructor(private media: ObservableMedia) {
    }

    ngOnInit() {
        this.media.subscribe((mediaChange: MediaChange) => {
            this.toggleView();
        });
    }

    getRouteAnimation(outlet) {
        return outlet.activatedRouteData.animation
    }

    toggleView() {
        if (this.media.isActive('gt-md')) {
            this.sideNavMode = 'side';
            this.sideNavOpened = true;
            this.matDrawerOpened = false;
            this.matDrawerShow = true;
        } else if (this.media.isActive('gt-xs')) {
            this.sideNavMode = 'side';
            this.sideNavOpened = false;
            this.matDrawerOpened = true;
            this.matDrawerShow = true;
        } else if (this.media.isActive('lt-sm')) {
            this.sideNavMode = 'over';
            this.sideNavOpened = false;
            this.matDrawerOpened = false;
            this.matDrawerShow = false;
        }
    }


}
