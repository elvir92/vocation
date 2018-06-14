import {Routes} from '@angular/router';
import {FrontendLayoutComponent} from "./layouts/frontend/frontend-layout.component";
import {FrontendTempLayoutComponent} from "./layouts/frontend/frontend-layout-temp.component";
import {AuthGuard} from "./_guards/auth.guard";
import {AuthLayoutComponent} from "./layouts/auth/auth-layout.component";
import {AuthAdminGuard} from "./_guards/auth.admin.guard";

export const AppRoutes: Routes = [
    {
        path: '',
        component: FrontendTempLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: './presentation/frontend/front-temp.module#FrontTempModule'
            },
        ]
    },
    {
        path: '',
        component: FrontendLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: './presentation/frontend/frontend.module#FrontendModule'
            },
        ]
    },
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: './presentation/backend/backend.module#BackendModule'
    },           
    /*{
        path: 'backend',
        component: BackendLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                loadChildren: './presentation/backend/backend.module#BackendModule'
            },
        ]
    },
    {
        path: 'admin',
        component: BackendLayoutComponent,
        canActivate: [AuthAdminGuard],
        children: [
            {
                path: '',
                loadChildren: './presentation/admin/admin.module#AdminModule'
            },
        ]
    },
    */
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: './presentation/auth/auth.module#AuthModule'
            },
        ]
    },

];

