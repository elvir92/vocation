import { Routes } from '@angular/router';
import { HomeTempComponent } from "./home/home-temp.component";

import {FrontendTempLayoutComponent} from "./_layout/frontend-layout-temp.component"


export const FrontendTempRoutes: Routes = [
    {
        path: '',
        component:FrontendTempLayoutComponent,        
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
