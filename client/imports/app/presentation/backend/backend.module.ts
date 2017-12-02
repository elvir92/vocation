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

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FormWizardModule,
        RouterModule.forChild(BackendRoutes),
        Ng2PaginationModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyB0wQKw08eJ7nH_FDKooxK1g1fmGYRhAR4',
            libraries: ['places']
        }),
        DropzoneModule.forChild(),
    ],
    declarations: [
        HomeComponent,
        PropertyNewComponent,
        PropertiesComponent,
        PropertyEditComponent,
        ...COMMON_DECLARATIONS
    ]
})


export class BackendModule {
}

