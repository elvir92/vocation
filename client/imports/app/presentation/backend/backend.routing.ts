import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";

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
        ]
    }
];
