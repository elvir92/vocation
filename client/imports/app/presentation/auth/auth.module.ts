import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthRoutes} from "./auth.routing";
import {LoginComponent} from "./login.component";
import {SignupComponent} from "./signup.component";
import {RecoverComponent} from "./recover.component";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(AuthRoutes),
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule
    ],
    declarations: [
        LoginComponent,
        RecoverComponent,
        SignupComponent
    ]
})

export class AuthModule {
}

