import { BathroomTypeComponent } from './bathroom-type/bathroom-type.component';
import { BedroomTypeComponent } from './bedroom-type/bedroom-type.component';
import { Routes } from '@angular/router';
import { PlacesComponent } from "./places/places.component";
import { AddressesComponent } from "./addresses/addresses.component";
import { ListGroupComponent } from "./listing/list-group.component";
import { ListGroupDetailComponent } from "./listing/list-group-detail.component";
import { LengthUnitComponent } from "./length-unit/length-unit.component";
import { PropertyTypeComponent } from "./property-type/property-type.component";
import { SubscribersComponent } from './subscribers/subscribers.component';

export const AdminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'places',
                component: PlacesComponent,
                pathMatch: 'full',
                data: {
                    title: 'Places'
                }
            },
            {
                    path: 'addresses',
                    component: AddressesComponent,
                    pathMatch: 'full',
                    data: {
                        title: 'Addresses'
                    }
                },
            {
                path: 'list-groups',
                pathMatch: 'full',
                component: ListGroupComponent,
                data: {
                    title: 'Groups'
                }
            },
            {
                path: 'list-groups/:id',
                pathMatch: 'full',
                component: ListGroupDetailComponent,
                data: {
                    title: 'Group Details'
                }
            },
            {
                path: 'length-units',
                component: LengthUnitComponent,
                data: {
                    title: 'Length Units'
                },
                pathMatch: 'full'
            },
            {
                path: 'property-types',
                component: PropertyTypeComponent,
                data: {
                    title: 'Property types'
                },
                pathMatch: 'full'
            },
            {
                path: 'bedroom-types',
                component: BedroomTypeComponent,
                data: {
                    title: 'Bedroom types'
                },
                pathMatch: 'full'
            },
            {
                path: 'bathroom-types',
                component: BathroomTypeComponent,
                data: {
                    title: 'Bathroom types'
                },
                pathMatch: 'full'
            },
            {
                path: 'subscribers',
                component: SubscribersComponent,
                pathMatch: 'full',
                data: {
                    title: 'Subscribers'
                }
            },
        ]
    }
];
