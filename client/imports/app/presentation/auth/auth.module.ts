import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthRoutes} from "./auth.routing";
import {LoginComponent} from "./login.component";
import {SignupComponent} from "./signup.component";
import {RecoverComponent} from "./recover.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(AuthRoutes),
    ],
    declarations: [
        LoginComponent,
        RecoverComponent,
        SignupComponent
    ]
})

export class AuthModule {
}

