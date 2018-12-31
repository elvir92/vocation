import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {componentDestroyed} from "ng2-rx-componentdestroyed";

@Component({
    //selector: 'app-',
    templateUrl: './property-edit.component.html',
    //styleUrls: ['./property-new.component.scss']template
})

export class PropertyEditComponent implements OnInit, OnDestroy {
    propertyId: string;

    constructor(private activatedRoute: ActivatedRoute,) {        
    }

    ngOnInit() {
        this.activatedRoute.params.takeUntil(componentDestroyed(this)).subscribe((params: Params) => {
            this.propertyId = params['id'];                                  
        });
    }

    ngOnDestroy(){
    }
}