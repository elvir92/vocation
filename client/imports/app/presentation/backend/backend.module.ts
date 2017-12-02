import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BackendRoutes} from "./backend.routing";
import {HomeComponent} from "./home/home.component";

@NgModule({
    imports: [
        RouterModule.forChild(BackendRoutes),
    ],
    declarations: [
        HomeComponent,

    ]
})

export class BackendModule {
}

