import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FrontendRoutes} from "./frontend.routing";
import {HomeComponent} from "./home/home.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule.forRoot(),
        RouterModule.forChild(FrontendRoutes),

    ],
    declarations: [
        HomeComponent,
    ],
    providers:[
    ]
})

export class FrontendModule {
}

