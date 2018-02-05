import {Component, OnInit, Input, HostListener, ElementRef} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
    isOpen: boolean = false;

    //currentUser = null;
    Hari;


    @Input() currentUser = null;

    @HostListener('document:click', ['$event', '$event.target'])
    onClick(event: MouseEvent, targetElement: HTMLElement) {
        console.log("clicked");
        if (!targetElement) {
            return;
        }

        const clickedInside = this.elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.isOpen = false;
        }
    }


    constructor(private elementRef: ElementRef, private router: Router) {
    }


    ngOnInit() {
    }

    logout() {
        Meteor.logout();
        this.router.navigate(['']);
    }

}
