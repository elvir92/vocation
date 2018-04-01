import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from "@angular/common";

import {AdminRoutes} from "./admin.routing";
import {PlacesComponent} from "./places/places.component";
import {ListGroupComponent} from "./listing/list-group.component";
import {ListGroupDetailComponent} from "./listing/list-group-detail.component";
import {LengthUnitComponent} from "./length-unit/length-unit.component";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {Ng2PaginationModule} from "ng2-pagination";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(AdminRoutes),
        Ng2PaginationModule,
        NgbModule
    ],
    declarations: [
        PlacesComponent,
        ListGroupComponent,
        ListGroupDetailComponent,
        LengthUnitComponent,
    ]
})

export class AdminModule {
}

