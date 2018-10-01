import { Routes } from '@angular/router';
import { HomeTempComponent } from "./home/home-temp.component";

export const FrontendTempRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: HomeTempComponent,
                data: {
                    title: 'Home'
                }

            },
        ]
    },
];
