import { LengthUnitDialog } from './length-unit/lenght-unit-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";

import { AdminRoutes } from "./admin.routing";
import { PlacesComponent } from "./places/places.component";
import { PropertyTypeDialog } from "./property-type/property-type-dialog.component";
import { PropertyTypeComponent } from "./property-type/property-type.component";
import { AddressesComponent } from "./addresses/addresses.component";
import { ListGroupComponent } from "./listing/list-group.component";
import { ListGroupDetailComponent } from "./listing/list-group-detail.component";
import { LengthUnitComponent } from "./length-unit/length-unit.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { Ng2PaginationModule } from "ng2-pagination";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatIconModule } from '@angular/material/icon';
import {
    MatDialogModule, MatInputModule, MatListModule, MatMenuModule, MatSelectModule, MatStepperModule, MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatExpansionModule
} from '@angular/material';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SubscribersComponent } from './subscribers/subscribers.component';
import { PlacesDialog } from './places/places-dialog.component';
import { AddressesDialog } from './addresses/addresses-dialog.component';
import { ListGroupAddNewDialog } from './listing/list-group-add-new-dialog.component';
import { ListGroupDetailDialog } from './listing/list-group-detail-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(AdminRoutes),
        Ng2PaginationModule,
        NgbModule,
        FlexLayoutModule,
        MatListModule,
        MatInputModule,
        MatDialogModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatSidenavModule,
        PerfectScrollbarModule,
        MatTableModule,
        MatMenuModule,
        MatStepperModule,
        MatSelectModule,
        MatExpansionModule
    ],
    entryComponents: [
        LengthUnitDialog, 
        PlacesDialog, 
        AddressesDialog, 
        ListGroupAddNewDialog, 
        ListGroupDetailDialog],
    declarations: [
        PlacesComponent,
        AddressesComponent,
        ListGroupComponent,
        ListGroupDetailComponent,
        LengthUnitComponent,
        PropertyTypeComponent,
        SubscribersComponent,
        LengthUnitDialog,
        PropertyTypeDialog,
        PlacesDialog,
        AddressesDialog,
        ListGroupAddNewDialog,
        ListGroupDetailDialog
    ]
})

export class AdminModule {
}
