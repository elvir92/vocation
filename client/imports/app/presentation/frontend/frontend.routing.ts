import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";


export const FrontendRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: HomeComponent,
                data: {
                    title: 'Home'
                }

            },]
    }
];
