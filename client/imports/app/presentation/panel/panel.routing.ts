import { ReservationsComponent } from './reservations/reservations.component';
import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PropertyNewComponent} from "./properties/property-new.component";
import {PropertiesComponent} from "./properties/properties.component";
import {PropertyEditComponent} from "./properties/property-edit.component";
import {PanelLayoutComponent} from "./_layout/panel-layout.component";
import { AuthAdminGuard } from '../../_guards';
import { MyProfileComponent } from './my-profile/my-profile.component';


export const PanelRoutes: Routes = [
    {
        path: '',
        component: PanelLayoutComponent,
        children: [
            {
                path: 'dashboard',
                component: HomeComponent,
                pathMatch: 'full',
                data: {
                    title: 'Dashboard'
                }
            },
            {
                path: 'property-new',
                component: PropertyNewComponent,
                pathMatch: 'full',
                data: {
                    title: 'New Property'
                }
            },
            {
                path: 'properties',
                component: PropertiesComponent,
                pathMatch: 'full',
                data: {
                    title: 'Properties'
                }
            },
            {
                path: 'property-edit/:id',
                component: PropertyEditComponent,
                pathMatch: 'full',
                data: {
                    title: 'Properties'
                }
            },
            {
                path: 'my-profile',
                component: MyProfileComponent,
                pathMatch: 'full',
                data: {
                    title: 'My Profile'
                }
            }, 
            {
                path: 'reservations',
                component: ReservationsComponent,
                pathMatch: 'full',
                data: {
                    title: 'Reservations'
                }
            },
        ]
    },
    {
        path: 'admin',
        component: PanelLayoutComponent,
        loadChildren: './admin/admin.module#AdminModule',
        canActivate: [AuthAdminGuard]
    },
];
