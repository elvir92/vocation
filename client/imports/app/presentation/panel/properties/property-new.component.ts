import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    //selector: 'app-',
    templateUrl: './property-new.component.html',
    //styleUrls: ['./property-new.component.scss']template
})

export class PropertyNewComponent implements OnInit {
    constructor() {        
    }

    ngOnInit() {
        console.log("INIT PROP_NEW");        
    }
}