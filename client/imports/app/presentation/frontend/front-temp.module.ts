import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
} from '@angular/material';

import { FrontendTempRoutes } from "./front-temp.routing";
import { HomeTempComponent } from "./home/home-temp.component";

import { FrontendTempLayoutComponent } from "./_layout/frontend-layout-temp.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule.forRoot(),
        RouterModule.forChild(FrontendTempRoutes),
        ReactiveFormsModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule
    ],
    declarations: [
        HomeTempComponent,
        FrontendTempLayoutComponent
    ],
    providers: [
    ]
})

export class FrontTempModule {
}
