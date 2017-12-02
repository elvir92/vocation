import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PropertyNewComponent} from "./properties/property-new.component";
import {PropertiesComponent} from "./properties/properties.component";
import {PropertyEditComponent} from "./properties/property-edit.component";

export const BackendRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'dashboard',
                component: HomeComponent,
                data: {
                    title: 'Dashboard'
                }
            },
            {
                path: 'property-new',
                component: PropertyNewComponent,
                data: {
                    title: 'New Property'
                }
            },
            {
                path: 'properties',
                component: PropertiesComponent,
                data: {
                    title: 'Properties'
                }
            },
            {
                path: 'property-edit/:id',
                component: PropertyEditComponent,
                data: {
                    title: 'Properties'
                }
            },

        ]
    }
];
