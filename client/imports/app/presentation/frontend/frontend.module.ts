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
    MatCardModule,
    MatToolbarModule
} from '@angular/material';

import { FrontendRoutes } from "./frontend.routing";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { GroupListComponent } from "./shared/group-list/group-list.component";
import { GroupItemComponent } from "./shared/group-item/group-item.component";
import { RegisterComponent } from "../auth/register.component";
import { ProfileComponent } from "./profile/profile.component";
import { HousesListComponent } from "./shared/houses-list/houses-list.component";
import { HouseCardItemComponent } from "./shared/house-card-item/house-card-item.component";
import { AccommodationComponent } from "./accomodation/accommodation.component";
import { RentalsSearchComponent } from './shared/rentals-search/rentals-search.component';

import { FrontendLayoutComponent } from "./_layout/frontend-layout.component";
import { SharedModule } from "./_layout/shared/shared.module";

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
        MatCardModule,
        MatToolbarModule,
        SharedModule
    ],
    declarations: [
        FrontendLayoutComponent,

        HomeComponent,
        ProfileComponent,
        HousesListComponent,
        HouseCardItemComponent,
        RegisterComponent,
        RentalsSearchComponent,
        GroupListComponent,
        GroupItemComponent,
        AccommodationComponent,
        HeaderComponent,
        FooterComponent,
    ],
    providers: [
    ]
})

export class FrontendModule {
}
