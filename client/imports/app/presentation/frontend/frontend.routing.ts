import { Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { HomeTempComponent } from "./home/home-temp.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegisterComponent } from "../auth/register.component";

export const FrontendRoutes: Routes = [
    {
        path: 'front',
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
        ]
    },
];
