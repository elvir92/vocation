import { ReservationsDialog } from './reservations/reservations-dialog.component';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PanelRoutes} from "./panel.routing";
import {HomeComponent} from "./home/home.component";
import {FormWizardModule} from 'angular2-wizard';
import {PropertyNewComponent} from "./properties/property-new.component";
import {PropertyWizardComponent} from "./properties/property-wizard.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AgmCoreModule} from "@agm/core";
import {DropzoneModule} from "ngx-dropzone-wrapper";
import {COMMON_DECLARATIONS} from "../../common";
import {PropertiesComponent} from "./properties/properties.component";
import {Ng2PaginationModule} from "ng2-pagination";
import {PropertyEditComponent} from "./properties/property-edit.component";
import { MyProfileComponent } from './my-profile/my-profile.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule, MatRippleModule,
    MatSelectModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule, MatTooltipModule
} from '@angular/material';

import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {PanelLayoutComponent} from "./_layout/panel-layout.component";
import {CoreModule} from "./_layout/core/core.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import { ReservationsComponent } from './reservations/reservations.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormWizardModule,
        RouterModule.forChild(PanelRoutes),
        Ng2PaginationModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBAK4deSMZrhM5paI_ua0uKoDzC2cm7rpE',
            libraries: ['places']
        }),
        DropzoneModule.forChild(),
        CoreModule,
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
        MatDatepickerModule,
        MatAutocompleteModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTooltipModule,
    ],
    declarations: [
        PanelLayoutComponent,
        HomeComponent,
        PropertyNewComponent,
        PropertyWizardComponent,
        MyProfileComponent,
        PropertiesComponent,
        PropertyEditComponent,
        ReservationsDialog,
        ReservationsComponent,
        ...COMMON_DECLARATIONS
    ],
    entryComponents: [ReservationsDialog],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ]
})


export class PanelModule {
}

