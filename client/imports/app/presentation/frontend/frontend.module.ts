import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FrontendRoutes} from "./frontend.routing";
import {HomeComponent} from "./home/home.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        RouterModule.forChild(FrontendRoutes),
        NgbModule,
    ],
    declarations: [
        HomeComponent,
    ]
})

export class FrontendModule {
}

