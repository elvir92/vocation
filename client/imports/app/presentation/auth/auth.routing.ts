import {Routes} from '@angular/router';
import {LoginComponent} from "./login.component";
import {SignupComponent} from "./signup.component";
import {RecoverComponent} from "./recover.component";

export const AuthRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'login',
                component: LoginComponent,
                data: {
                    title: 'Login'
                },
                pathMatch: 'full',
            },
            {
                path: 'signup',
                component: SignupComponent,
                data: {
                    title: 'Signup'
                },
                pathMatch: 'full',
            },
            {
                path: 'recover',
                component: RecoverComponent,
                data: {
                    title: 'Recover'
                },
                pathMatch: 'full',
            },
        ]
    }
];
