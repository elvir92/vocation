import {Routes} from '@angular/router';
import {PlacesComponent} from "./places/places.component";
import {ListGroupComponent} from "./listing/list-group.component";
import {ListGroupDetailComponent} from "./listing/list-group-detail.component";
import {LengthUnitComponent} from "./length-unit/length-unit.component";

export const AdminRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'places',
                component: PlacesComponent,
                data: {
                    title: 'Places'
                }
            },
            {
                path: 'list-groups',
                component: ListGroupComponent,
                data: {
                    title: 'Groups'
                }
            },
            {
                path: 'list-groups/:id',
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
                }
            },

        ]
    }
];
