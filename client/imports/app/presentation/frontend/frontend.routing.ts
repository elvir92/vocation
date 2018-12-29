import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegisterComponent } from "../auth/register.component";
import { AccommodationComponent } from "./accomodation/accommodation.component";

import { FrontendLayoutComponent } from "./_layout/frontend-layout.component"

export const FrontendRoutes: Routes = [
    {
        path: 'front',
        component: FrontendLayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
                data: {
                    title: 'Home'
                }

            },
            {
                path: 'profile',
                component: ProfileComponent,
                data: {
                    title: 'Profile'
                }
            },
            {
                path: 'register',
                component: RegisterComponent,
                data: {
                    title: 'Register'
                }

            },
            {
                path: 'accommodation',
                component: AccommodationComponent,
                data: {
                    title: 'Accommodation'
                }

            }
        ]
    },
];
