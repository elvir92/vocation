import {Routes} from '@angular/router';
import {FrontendLayoutComponent} from "./presentation/frontend/_layout/frontend-layout.component";
import {FrontendTempLayoutComponent} from "./presentation/frontend/_layout/frontend-layout-temp.component";
import {AuthGuard} from "./_guards/auth.guard";
import {AuthLayoutComponent} from "./presentation/auth/_layout/auth-layout.component";
import {AuthAdminGuard} from "./_guards/auth.admin.guard";

export const AppRoutes: Routes = [
    {
        path: '',        
        loadChildren: './presentation/frontend/front-temp.module#FrontTempModule'        
    },    
    { 
        path: 'v2', 
        redirectTo: 'home/demos', 
        pathMatch: 'full' 
      },
    {
        path: 'home', 
        loadChildren: './presentation/frontend/home_v2/home.module#HomeModule',
    },
    {
        path: '',        
        loadChildren: './presentation/frontend/frontend.module#FrontendModule'        
    },
    
    {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: './presentation/panel/panel.module#PanelModule'
    },               
    {
        path: '',
        loadChildren: './presentation/auth/auth.module#AuthModule'        
    },

];

