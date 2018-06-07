import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';

import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {AppRoutes} from "./app.routing";
import {FrontendLayoutComponent} from "./layouts/frontend/frontend-layout.component";
import {AuthLayoutComponent} from "./layouts/auth/auth-layout.component";
import {AuthGuard} from "./_guards/auth.guard";
import {AuthAdminGuard} from "./_guards/auth.admin.guard";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToasterModule} from "angular2-toaster";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HeaderComponent} from "./layouts/frontend/header/header.component";
import {FooterComponent} from "./layouts/frontend/footer/footer.component";
import { MatButtonModule,MatCardModule,MatToolbarModule,MatInputModule,MatListModule} from '@angular/material'

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(AppRoutes),
        NgbModule.forRoot(),
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        ToasterModule,
        MatToolbarModule,
        MatButtonModule
    ],
    declarations: [
        AppComponent,
        FrontendLayoutComponent,
        AuthLayoutComponent,
        HeaderComponent,
        FooterComponent,
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
