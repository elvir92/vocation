import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FrontendRoutes} from "./frontend.routing";
import {HomeComponent} from "./home/home.component";
import {HomeTempComponent} from "./home/home-temp.component";
import {RegisterComponent} from "../auth/register.component";
import {ProfileComponent} from "./profile/profile.component";
import {HousesListComponent} from "./shared/houses-list/houses-list.component";
import {HouseCardItemComponent} from "./shared/house-card-item/house-card-item.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatDatepickerModule,
  MatSelectModule,
  MatNativeDateModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule.forRoot(),
        RouterModule.forChild(FrontendRoutes),
        ReactiveFormsModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule
    ],
    declarations: [
        HomeComponent,
        ProfileComponent,
        HousesListComponent,
        HouseCardItemComponent,
        RegisterComponent
    ],
    providers:[
    ]
})

export class FrontendModule {
}
