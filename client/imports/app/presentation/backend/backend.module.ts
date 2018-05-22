import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BackendRoutes} from "./backend.routing";
import {HomeComponent} from "./home/home.component";
import {FormWizardModule} from 'angular2-wizard';
import {PropertyNewComponent} from "./properties/property-new.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AgmCoreModule} from "@agm/core";
import {DropzoneModule} from "ngx-dropzone-wrapper";
import {COMMON_DECLARATIONS} from "../../common/index";
import {PropertiesComponent} from "./properties/properties.component";
import {Ng2PaginationModule} from "ng2-pagination";
import {PropertyEditComponent} from "./properties/property-edit.component";

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
import {BackendLayoutComponent} from "./_layout/backend-layout.component";
import {CoreModule} from "./_layout/core/core.module";
import {FlexLayoutModule} from "@angular/flex-layout";


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormWizardModule,
        RouterModule.forChild(BackendRoutes),
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
        BackendLayoutComponent,
        HomeComponent,
        PropertyNewComponent,
        PropertiesComponent,
        PropertyEditComponent,
        ...COMMON_DECLARATIONS
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ]
})


export class BackendModule {
}

