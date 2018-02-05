import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PropertyNewComponent} from "./properties/property-new.component";
import {PropertiesComponent} from "./properties/properties.component";
import {PropertyEditComponent} from "./properties/property-edit.component";
import {BackendLayoutComponent} from "./_layout/backend-layout.component";


export const BackendRoutes: Routes = [
    {
        path: '',
        component: BackendLayoutComponent,
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

        ]
    }
];
