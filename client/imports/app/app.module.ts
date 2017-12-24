import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';

import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {AppRoutes} from "./app.routing";
import {FrontendLayoutComponent} from "./layouts/frontend/frontend-layout.component";
import {BackendLayoutComponent} from "./layouts/backend/backend-layout.component";
import {AuthLayoutComponent} from "./layouts/auth/auth-layout.component";
import {AuthGuard} from "./_guards/auth.guard";
import {AuthAdminGuard} from "./_guards/auth.admin.guard";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToasterModule} from "angular2-toaster";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HeaderBackendComponent} from "./layouts/backend/navigation/header/header.component";
import {MenuBackendComponent} from "./layouts/backend/navigation/menu/menu.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SidebarModule } from 'ng-sidebar';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(AppRoutes),
        NgbModule.forRoot(),
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        ToasterModule,
        SidebarModule.forRoot(),
    ],
    declarations: [
        AppComponent,
        FrontendLayoutComponent,
        BackendLayoutComponent,
        AuthLayoutComponent,
        HeaderBackendComponent,
        MenuBackendComponent,
    ],
    providers: [
        AuthGuard,
        AuthAdminGuard
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
