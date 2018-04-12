import { LengthUnitDialog } from './length-unit/lenght-unit-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
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
import {MatIconModule} from '@angular/material/icon';
import {
    MatDialogModule, MatInputModule, MatListModule, MatMenuModule, MatSelectModule, MatStepperModule, MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule
} from '@angular/material';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SubscribersComponent } from './subscribers/subscribers.component';

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
    ],
    entryComponents: [LengthUnitDialog],
    declarations: [
        PlacesComponent,
        ListGroupComponent,
        ListGroupDetailComponent,
        LengthUnitComponent,
        SubscribersComponent,
        LengthUnitDialog
    ]
})

export class AdminModule {
}

